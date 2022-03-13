import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FriendListCard from "../components/FriendListCardComponent";
import { FlatList } from "react-native-gesture-handler";

const FriendListScreen = (props) => {

    const route = useRoute();

    console.log("friendData: " + route.params.friendData);


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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                    <AntDesign
                        name={"back"}
                        size={35}>
                    </AntDesign>
                </TouchableOpacity>
            </View>
            <Text style={styles.screenHeaderWithLogo}>Takipçilerim</Text>
            {route.params.friendData.length > 0 ?
                <FlatList
                    style={{ padding: 15 }}
                    data={route.params.friendData}
                    renderItem={(data) => {
                        return (
                            <FriendListCard
                                id={data.item.id}
                                name={data.item.name}
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