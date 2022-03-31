import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import SearchBarComponent from '../components/SearchBarComponent';
import FormCardComponent from '../components/FormCardComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../Firebase/firebase';
import { FlatList } from "react-native-gesture-handler";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';


const FormScreen = (props) => {

    const [loading, setLoading] = useState(true);
    const [forms, setForms] = useState([]);
    const [formsFilter, setFormsFilter] = useState([]);
    const [text, setText] = useState("");


    useEffect(() => {
        const timeout = setTimeout(() => {
            setFormsFilter(forms.filter(f => text === "" || f.formTitle.toUpperCase().indexOf(text.toUpperCase()) !== -1));
        }, 250);
        return () => clearTimeout(timeout)
    }, [text, forms])


    useFocusEffect(
        useCallback(() => {
            const unsubscribe = db.collection("forms")
                .onSnapshot(async (querySnaphot) => {
                    const rforms = querySnaphot
                        .docChanges()
                        .map(async (item) => {
                            const data = item.doc.data();
                            if (!forms.filter(element => element.id == item.doc.id).length) {
                                return {
                                    key: item.doc.id,
                                    formTitle: data.formTitle,
                                    createdAt: data.createdAt.toDate(),
                                    messageCount: await getMessageCount(item.doc.id),
                                    userCount: data.users.length,
                                };
                            }
                            return null;
                        })
                        .filter(e => e)
                    Promise.all(rforms).then(rforms => {
                        setForms(rforms);
                        setLoading(false);
                    });
                })
            return () => {
                unsubscribe();
            };
        }, [])
    );

    const getMessageCount = async (formId) => {
        const res = await db.collection("forms" + "/" + formId + "/messages").get();
        return res.size;
    }

    const createForm = () => {
        props.navigation.navigate("CreateForm");
    }

    const userForms = () => {
        props.navigation.navigate("UserForms");
    }

    const LoadingScreen = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }

    const EmptyListScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons
                    name={"comment-search-outline"}
                    size={50}
                    color={"#cad1d7"}
                />
                <Text style={{ fontSize: 18, color: "#cad1d7", marginTop: 15 }}>Forum listesi boş !</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.screenHeader}>Forum</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.addFormButton}>
                        <MaterialCommunityIcons
                            name={"text-box-search"}
                            size={30}>
                        </MaterialCommunityIcons>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addFormButton} onPress={userForms}>
                        <MaterialIcons
                            name={"my-library-books"}
                            size={30}>
                        </MaterialIcons>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addFormButton} onPress={createForm}>
                        <MaterialIcons
                            name={"library-add"}
                            size={30}>
                        </MaterialIcons>
                    </TouchableOpacity>
                </View>
            </View>
            <SearchBarComponent text={text} setText={setText} loading={loading} />
            {loading ? <LoadingScreen /> :
                formsFilter.length === 0 ? <EmptyListScreen /> :
                    <FlatList
                        style={{ padding: 15 }}
                        data={formsFilter}
                        renderItem={(data) => {
                            return (
                                <FormCardComponent
                                    id={data.item.key}
                                    formTitle={data.item.formTitle}
                                    messageCount={data.item.messageCount}
                                    userCount={data.item.userCount}
                                    createdAt={data.item.createdAt}
                                    goChat={() => props.navigation.navigate("FormChat", { id: data.item.key, title: data.item.formTitle })}
                                />
                            );
                        }}
                    />
            }
        </SafeAreaView>
    );

}

export default FormScreen;