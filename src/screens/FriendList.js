import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FriendListCard from "../components/FriendListCardComponent";
import { FlatList } from "react-native-gesture-handler";
import { db, auth } from "../../Firebase/firebase";
import {useTheme} from '@react-navigation/native';

const FriendListScreen = (props) => {

    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const unsubscribe = useRef();
    const theme = useTheme();

    useFocusEffect(useCallback(() => {

        return () => {
            console.log("unsubscribe");
            unsubscribe.current instanceof Function && unsubscribe.current()
        };
    }, [unsubscribe]));

    

    const goBack = () => {
        props.navigation.goBack();
    }

    const EmptyScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons
                    name={"person-add-disabled"}
                    size={Dimensions.get("window").height / 10}
                    color={"#cad1d7"}
                ></MaterialIcons>
                <Text style={{ fontSize: 18, color: "#cad1d7", marginTop: 15 }}>Takipçi listesi boş!</Text>
            </View>
        );
    }


    const goChat = (user) => {

        console.log("entered !");
        setLoading(true);

        const userName = user.name.split(" ");

        unsubscribe.current = db.collection("chats")
            .where("users", "array-contains", auth.currentUser?.uid)
            .get()
            .then(function (querySnapshot) {
                let tag = false;
                querySnapshot.forEach(function (doc) {
                    if (doc.data().users.includes(user.id)) {
                        setLoading(false);
                        navigateScreen(doc.id, userName);
                        props.navigation.navigate("ChatScreens",
                            {
                                screen: "ChatScreen",
                                params: { id: doc.id, name: userName[0], surname: userName[1] }
                            });
                        tag = true;
                        return;
                    }
                });
                return tag;

            }).then(async (tag) => {
                //create chat
                if (!tag) {
                    const ref = await db.collection("chats").add({ users: [auth.currentUser?.uid, user.id] });
                    setLoading(false);
                    navigateScreen(ref.id, userName);
                }

            });

    }

    const navigateScreen = (paramId, userName) => {
        props.navigation.navigate("ChatScreens",
            {
                screen: "ChatScreen",
                params: { id: paramId, name: userName[0], surname: userName[1] }
            });
    }
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                    <AntDesign
                        name={"back"}
                        color={theme.colors.text}
                        size={35}>
                    </AntDesign>
                </TouchableOpacity>
            </View>
            <Text style={{...styles.screenHeaderWithLogo, color: theme.colors.text}}>Takipçilerim</Text>
            {route.params.friendData.length > 0 ?
                <FlatList
                    style={{ padding: 15 }}
                    data={route.params.friendData}
                    renderItem={(data) => {
                        return (
                            <FriendListCard
                                id={data.item.id}
                                name={data.item.name}
                                theme={theme}
                                goChat={() => goChat(data.item)}
                            />
                        );
                    }}
                    keyExtractor={(item) => item.id}
                >
                </FlatList>
                : <EmptyScreen />}
        </SafeAreaView>
    );

}

export default FriendListScreen;