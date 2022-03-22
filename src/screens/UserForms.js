import React, { useEffect, useState, useCallback } from 'react'
import { View, ActivityIndicator, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchBarComponent from '../components/SearchBarComponent';
import FormCardComponent from '../components/FormCardComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { db, auth } from '../../Firebase/firebase';
import { FlatList } from "react-native-gesture-handler";

const UserFormScreen = (props) => {

    const [loading, setLoading] = useState(true);
    const [forms, setForms] = useState([]);
    const [formsFilter, setFormsFilter] = useState([]);
    const [text, setText] = useState("");

    //show createdForms
    useEffect(() => {
        const unsubscribe = db.collection("forms")
            .where("createdUser", "==", auth.currentUser?.uid)
            .onSnapshot(querySnapshot => {
                const forms = querySnapshot
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

    const goBack = () => {
        props.navigation.goBack();
    }

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

    const EmptyListScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons
                    name={"chat-remove-outline"}
                    size={50}
                    color={"#cad1d7"}
                />
                <Text style={{ fontSize: 18, color: "#cad1d7", marginTop: 15 }}>Forum listesi boş !</Text>
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={styles.screenHeaderWithLogo}>Forumlarım</Text>
            <SearchBarComponent text={text} setText={setText} searchFunction={searchForms} />
            {loading ? <LoadingScreen /> :
                forms.length ?
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
                    : <EmptyListScreen />}
        </SafeAreaView>
    );

}

export default UserFormScreen