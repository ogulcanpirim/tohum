import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ActivityIndicator, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import SearchBarComponent from '../components/SearchBarComponent';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RentCardComponent from '../components/RentCardComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../../Firebase/firebase';
import { FlatList } from "react-native-gesture-handler";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RentScreen = (props) => {

    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [rents, setRents] = useState([]);
    const [rentsFilter, setRentsFilter] = useState([]);
    const [text, setText] = useState("");

    async function getUserData(uid) {
        const response = await db.collection("users").doc(uid).get();
        return response.data();
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRentsFilter(rents.filter(r => text === "" || r.title.toUpperCase().indexOf(text.toUpperCase()) !== -1));
        }, 250);
        return () => clearTimeout(timeout)
    }, [text, rents])


    useFocusEffect(
        useCallback(() => {
            const unsubscribe = db.collection("rents")
                .onSnapshot(async (querySnaphot) => {
                    const upcomingRents = querySnaphot
                        .docChanges()
                        .map(async (item) => {
                            const data = item.doc.data();
                            if (!rents.filter(element => element.id == item.doc.id).length) {
                                const userData = await getUserData(data.user);
                                return {
                                    key: item.doc.id,
                                    title: data.title,
                                    user: userData.name + ' ' + userData.surname,
                                    description: data.description,
                                    images: data.images,
                                    price: data.price,
                                };
                            }
                            return null;
                        })
                        .filter(e => e)
                    Promise.all(upcomingRents).then(upcomingRents => {
                        setRents(upcomingRents);
                        setLoading(false);
                    });
                })
            return () => {
                unsubscribe();
            };
        }, [])
    );

    const LoadingScreen = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }

    const navigateToCreate = () => {
        props.navigation.navigate("CreateRent");
    }

    const navigateToUserRent = () => {
        props.navigation.navigate("UserRent");
    }

    const EmptyListScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons
                    name={"comment-search-outline"}
                    size={50}
                    color={"#cad1d7"}
                />
                <Text style={{ fontSize: 18, color: "#cad1d7", marginTop: 15 }}>İlan listesi boş !</Text>
            </View>
        );
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...styles.screenHeader, color: theme.colors.text }}>Kirala</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.addFormButton}>
                        <Ionicons
                            name={"filter"}
                            color={theme.colors.text}
                            size={30}>
                        </Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addFormButton} onPress={navigateToUserRent}>
                        <Entypo
                            name={"archive"}
                            color={theme.colors.text}
                            size={30}>
                        </Entypo>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addFormButton} onPress={navigateToCreate}>
                        <FontAwesome5
                            name={"plus-circle"}
                            color={theme.colors.text}
                            size={30}>
                        </FontAwesome5>
                    </TouchableOpacity>
                </View>
            </View>
            <SearchBarComponent text={text} setText={setText} loading={loading} />
            {loading ? <LoadingScreen /> :
                rentsFilter.length === 0 ? <EmptyListScreen /> :
                    <FlatList
                        data={rentsFilter}
                        renderItem={(data) => {
                            return (
                                <RentCardComponent
                                    id={data.item.key}
                                    title={data.item.title}
                                    user={data.item.user}
                                    description={data.item.description}
                                    price={data.item.price}
                                    image={data.item.images[0]}
                                    theme={theme}
                                    goItem={() => props.navigation.navigate("RentItemScreen", { ...data.item })}
                                />
                            );
                        }}
                    />
            }
        </SafeAreaView>
    );

}

export default RentScreen;