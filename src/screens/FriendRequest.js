import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, Dimensions, View, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from "./styles";
import { FlatList } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FriendRequestCard from "../components/FriendRequestComponent";
import { auth, db } from "../../Firebase/firebase";
import { deleteField } from "firebase/firestore";

const FriendRequestScreen = (props) => {

    /*
        friend_accept_state: 1
        friend_request_state: 0
    */
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);

    const goBack = () => {
        props.navigation.goBack();
    }

    async function getUserData(uid) {
        const response = await db.collection("users").doc(uid).get();
        return response.data();
    }


    useEffect(() => {
        const unsubscribe = db.collection("friendships")
            .doc(auth.currentUser?.uid)
            .onSnapshot(async (querySnapshot) => {
                const data = querySnapshot.data();
                for (const key in data) {
                    //encounter with same
                    const haveSameKey = requests.filter(item => item?.id == key).length;
                    await Promise.all(haveSameKey);
                    if (data[key] == 0 && !haveSameKey) {
                        const userData = await getUserData(key);
                        const item = {
                            id: key,
                            name: userData.name + ' ' + userData.surname,
                        }
                        appendItem(item);
                    }
                }

                setLoading(false);
            });
        return () => unsubscribe();
    }, [requests]);

    const handleEvent = async (id, accept) => {
        setLoading(true);
        await deleteItem(id);
        const updateDoc = {};
        updateDoc[`${id}`] = accept ? 1 : deleteField();
        await db.collection("friendships").doc(auth.currentUser?.uid).update(updateDoc);
        const newDoc = {};
        newDoc[`${auth.currentUser?.uid}`] = accept ? 1 : deleteField();
        await db.collection("friendships").doc(id).update(newDoc);
        setLoading(false);
    }

    const deleteItem = async (id) => {
        const promiseRequests = requests.filter(item => item.id !== id);
        await Promise.all(promiseRequests);
        setRequests(promiseRequests);
    }

    const appendItem = (requests) => {
        setRequests((previousRequests) => [requests, ...previousRequests]);
    };



    const LoadingScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }

    const EmptyScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons
                    name={"person-add-disabled"}
                    size={Dimensions.get("window").height / 10}
                    color={"#cad1d7"}
                ></MaterialIcons>
                <Text style={{ fontSize: 18, color: "#cad1d7", marginTop: 15 }}>Arkadaşlık isteği bulunmuyor !</Text>
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
            <Text style={styles.screenHeaderWithLogo}>Arkadaş İstekleri</Text>
            {loading ? <LoadingScreen /> : requests.length > 0 ?
                <FlatList
                    style={{ padding: 15 }}
                    data={requests}
                    renderItem={(data) => {
                        return (
                            <FriendRequestCard
                                id={data.item.id}
                                name={data.item.name}
                                handleAccept={() => handleEvent(data.item.id, true)}
                                handleReject={() => handleEvent(data.item.id, false)}
                            />
                        );
                    }}
                    keyExtractor={(item) => item.id}
                >
                </FlatList> : <EmptyScreen />
            }
        </SafeAreaView >
    )
}

export default FriendRequestScreen;