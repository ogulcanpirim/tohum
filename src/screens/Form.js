import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import SearchBarComponent from '../components/SearchBarComponent';
import FormCardComponent from '../components/FormCardComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { db } from '../../Firebase/firebase';
import { FlatList } from "react-native-gesture-handler";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FormScreen = (props) => {

    const [loading, setLoading] = useState(true);
    const [forms, setForms] = useState([]);
    const [formsFilter, setFormsFilter] = useState([]);
    const [text, setText] = useState("");

    //get forms
    useEffect(() => {
        const unsubscribe = db.collection("forms")
            .onSnapshot(querySnaphot => {
                const forms = querySnaphot
                    .docChanges()
                    .map(item => {
                        const data = item.doc.data();
                        return {
                            key: item.doc.id,
                            formTitle: data.formTitle,
                            createdAt: data.createdAt.toDate(),
                            messageCount: 1,
                            userCount: 1,
                        };
                    })
                appendForms(forms);
                setLoading(false);
            })
        return () => { unsubscribe() };
    }, []);

    //real-time search
    const searchForms = async (text) => {
        setLoading(true);
        const searchPromise = formsFilter.filter(item => {
            const name = item.formTitle.toUpperCase();
            const textData = text.toUpperCase();
            return name.indexOf(textData) > -1;
        });
        await Promise.all(searchPromise);
        setForms(searchPromise);
        setLoading(false);
    }

    const appendForms = useCallback((forms) => {
        setFormsFilter((previousForms) => previousForms.length ? [previousForms, ...forms] : [...forms]);
        setForms((previousForms) => previousForms.length ? [previousForms, ...forms] : [...forms]);
    }, [forms])

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
            <SearchBarComponent text={text} setText={setText} searchFunction={searchForms} />
            {loading ? <LoadingScreen /> :
                forms.length == 0 ? <EmptyListScreen /> :
                    <FlatList
                        style={{ padding: 15 }}
                        data={forms}
                        renderItem={(data) => {
                            return (
                                <FormCardComponent
                                    id={data.item.key}
                                    formTitle={data.item.formTitle}
                                    messageCount={data.item.messageCount}
                                    userCount={data.item.userCount}
                                    createdAt={data.item.createdAt}
                                />
                            );
                        }}
                    />
            }
        </SafeAreaView>
    );

}

export default FormScreen;