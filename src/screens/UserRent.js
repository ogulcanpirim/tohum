import React, { useState, useRef, useCallback, useEffect } from "react";
import { View, Alert, ActivityIndicator, TouchableOpacity, Text, SafeAreaView } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from "./styles";
import { useTheme } from '@react-navigation/native';
import SearchBarComponent from "../components/SearchBarComponent";
import RentCardComponent from "../components/RentCardComponent";
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { db, auth } from "../../Firebase/firebase";
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getStorage, ref, listAll, deleteObject } from 'firebase/storage';

const UserRentScreen = (props) => {

    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [rents, setRents] = useState([]);
    const [rentsFilter, setRentsFilter] = useState([]);
    const [text, setText] = useState("");
    const unsubscribe = useRef();
    const storage = getStorage();

    const goBack = () => {
        props.navigation.goBack();
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRentsFilter(rents.filter(f => text === "" || f.title.toUpperCase().indexOf(text.toUpperCase()) !== -1));
        }, 250);
        return () => clearTimeout(timeout)
    }, [text, rents])

    useFocusEffect(useCallback(() => {
        loadData();
        return () => {
            unsubscribe.current()
        };
    }, [unsubscribe]));

    const loadData = () => {
        setLoading(true);
        unsubscribe.current = db.collection("rents")
            .where("user", "==", auth.currentUser?.uid)
            .onSnapshot(async (querySnapshot) => {
                const upcomingRents = querySnapshot
                    .docChanges()
                    .filter(({ type }) => type != "removed")
                    .map(async (item) => {
                        const data = item.doc.data();
                        return {
                            key: item.doc.id,
                            title: data.title,
                            price: data.price,
                            description: data.description,
                            images: data.images,
                            //createdAt: data.createdAt.toDate(),
                        };
                    })
                await Promise.all(upcomingRents).then(upcomingRents => {
                    if (upcomingRents.length > 0) {
                        setRents(upcomingRents);
                    }
                    setLoading(false);
                });
            });
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

    const LoadingScreen = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }


    const HiddenItemWithActions = props => {
        const {
            onDelete,
        } = props;

        return (
            <TouchableOpacity onPress={onDelete} style={styles.rowBack}>
                <View style={[styles.rentRightBtn, styles.rentRightBtnRight]}>
                    <FontAwesome5
                        name={"trash-alt"}
                        color={"#fff"}
                        size={25}>
                    </FontAwesome5>
                </View>
            </TouchableOpacity>
        );
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        const item = rowMap[rowKey]?.props.item;
        Alert.alert(
            "İlan Kaldırma",
            '"Seçilen ilanı silmek istiyor musunuz?'
            , [
                {
                    text: 'Vazgeç',
                    onPress: () => { closeRow(rowMap, rowKey) },
                    style: 'cancel',
                },
                {
                    text: 'Çıkar',
                    onPress: () => { deleteRentItem(item) },
                    style: 'destructive'
                },
            ]);
    };

    const deleteRentItem = async (item) => {
        setLoading(true);
        //delete images from storage
        await deleteImages(item);
        await db.collection("rents").doc(item.key).delete();
        setRents(prev => prev.filter(element => element.key !== item.key));
        setLoading(false);
    }

    const deleteImages = async (item) => {
        const fileRef = ref(storage, auth.currentUser?.uid + '/rents/' + item.key);
        await listAll(fileRef).then(async (files) => {
            for (let i = 0; i < files.items.length; i++) {
                await deleteObject(files.items[i]);
            }
        });
    }

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    color={theme.colors.text}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={{ ...styles.screenHeaderWithLogo, color: theme.colors.text }}>İlanlarım</Text>
            <SearchBarComponent text={text} setText={setText} loading={loading} theme={theme} />
            {loading ? <LoadingScreen /> :
                rentsFilter.length === 0 ? <EmptyListScreen /> : <SwipeListView
                    data={rentsFilter}
                    renderItem={(data, rowMap) => (
                        <RentCardComponent
                            title={data.item.title}
                            price={data.item.price}
                            user={"Oğulcan Pirim"}
                            image={data.item.images[0]}
                            theme={theme}
                            goItem={() => props.navigation.navigate("RentItemScreen", { ...data.item })}
                        />
                    )}
                    renderHiddenItem={renderHiddenItem}
                    useNativeDriver={false}
                    leftOpenValue={0}
                    rightOpenValue={-75}
                />
            }
        </SafeAreaView>

    );
}


export default UserRentScreen;