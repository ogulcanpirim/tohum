import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from "./styles";
import { useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db, auth } from "../../Firebase/firebase";
import { deleteField } from "firebase/firestore";
import { useTheme } from "@react-navigation/native";

const UserScreen = (props) => {

    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [request, setRequest] = useState(false);
    const [follower, setFollower] = useState(0);
    const [friend, setFriend] = useState(false);
    const theme = useTheme();


    const goBack = () => {
        props.navigation.goBack();
    }

    useEffect(() => {
        setLoading(false);
        const unsubscribe = db.collection("friendships")
            .doc(route.params._id)
            .onSnapshot(async (querySnapshot) => {
                const data = querySnapshot.data();
                if (querySnapshot.exists) {
                    const count = Object.values(data).filter(item => item == 1).length;
                    const isFriend = Object.keys(data).find(key => auth.currentUser.uid == key).length > 0;
                    await Promise.all(count);
                    await Promise.all(isFriend);
                    setFriend(isFriend)
                    setFollower(count);
                    setLoading(false);
                }
            });

        return () => {
            unsubscribe();
        }
    }, [])


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }


    const FriendEventButton = () => {

        if (request) {
            return (
                <TouchableOpacity style={styles.friendRequestButton} onPress={FriendActionEvent}>
                    <Ionicons name={"person-remove"} style={styles.iconButtonStyle} size={25} color={"#ffffff"} />
                    <Text style={styles.profileButtonText}>{"Arkadaşlık isteğini iptal et"}</Text>
                </TouchableOpacity>
            );
        }



        return (
            <TouchableOpacity style={!friend ? styles.friendButton : styles.notFriendButton} onPress={FriendActionEvent}>
                <Ionicons name={!friend ? "person-add" : "person-remove"} style={styles.iconButtonStyle} size={25} color={"#ffffff"} />
                <Text style={styles.profileButtonText}>{!friend ? "Arkadaşlık isteği gönder" : "Arkadaşlardan çıkar"}</Text>
            </TouchableOpacity>
        );
    }

    const friendDatabaseEvent = async (event) => {
        const updateDoc = {};
        const newDoc = {};
        updateDoc[`${route.params._id}`] = event ? 0 : deleteField(); // request => 0
        await db.collection("friendships").doc(auth.currentUser?.uid).update(updateDoc);
        newDoc[`${auth.currentUser?.uid}`] = event ? 0 : deleteField();
        await db.collection("friendships").doc(route.params._id).update(newDoc);
    }


    const FriendActionEvent = async () => {

        setLoading(true);
        if (!friend && !request) {
            //send friend request 
            await friendDatabaseEvent(true);
            setRequest(true);

        }
        else if (request) {
            //remove friend request
            await friendDatabaseEvent(false);
            setRequest(false);
        }
        else {
            //remove friend
            await friendDatabaseEvent(false);
            setFriend(false);
        }
        setLoading(false);

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
            <Avatar
                size={Dimensions.get('window').width / 3}
                rounded
                source={route.params.avatar.toString().includes('https') ? { uri: route.params.avatar } : require('../assets/images/farmer_pp.png')}
                containerStyle={{ alignSelf: 'center' }}
            />
            <Text style={{ ...styles.profileName, color: theme.colors.text }}>{route.params.name}</Text>
            <View style={{ ...styles.profileLine, borderColor: theme.colors.line }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', padding: Dimensions.get('window').height / 50 }}>
                    <Text style={{ ...styles.profileTextVariable, color: theme.colors.text }}>{follower}</Text>
                    <Text style={{ ...styles.profileTextConstant, color: theme.colors.text }}>Takipçi</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', padding: Dimensions.get('window').height / 50 }}>
                    <Text style={{ ...styles.profileTextVariable, color: theme.colors.text }}>89</Text>
                    <Text style={{ ...styles.profileTextConstant, color: theme.colors.text }}>Forum Cevabı</Text>
                </View>
            </View>
            <FriendEventButton />
        </SafeAreaView>
    )
}

export default UserScreen;