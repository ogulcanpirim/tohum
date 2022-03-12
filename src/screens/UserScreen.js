import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from "./styles";
import { useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
const UserScreen = (props) => {

    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [request, setRequest] = useState(false);

    const goBack = () => {
        props.navigation.goBack();
    }

    const sendFriendRequest = () => {
        setRequest(!request);
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Avatar
                size={Dimensions.get('window').width / 3}
                rounded
                source={route.params.avatar.toString().includes('https') ? { uri: route.params.avatar } : require('../assets/images/farmer_pp.png')}
                containerStyle={{ alignSelf: 'center' }}
            />
            <Text style={styles.profileName}>{route.params.name}</Text>
            <View style={styles.profileLine} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', padding: Dimensions.get('window').height / 50 }}>
                    <Text style={styles.profileTextVariable}>128</Text>
                    <Text style={styles.profileTextConstant}>Takipçi</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', padding: Dimensions.get('window').height / 50 }}>
                    <Text style={styles.profileTextVariable}>89</Text>
                    <Text style={styles.profileTextConstant}>Forum Cevabı</Text>
                </View>
            </View>
            <TouchableOpacity style={request ? styles.friendButton : styles.notFriendButton} onPress={sendFriendRequest}>
                <Ionicons name={request ? "person-add" : "person-remove"} style={styles.iconButtonStyle} size={25} color={"#ffffff"} />
                <Text style={styles.profileButtonText}>{request ? "Arkadaşlık isteği gönder" : "Arkadaşlardan çıkar"}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default UserScreen;