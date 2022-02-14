import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { auth, db } from '../../Firebase/firebase';
import { doc } from "firebase/firestore";
import EncryptedStorage from 'react-native-encrypted-storage';

const ProfileScreen = (props) => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getUser = async () => {
            const response = await db.collection("users").doc(auth.currentUser?.uid).onSnapshot(doc => {
                const user = doc.data();
                setUser(user);
                setLoading(false);
            })
            return response;
        }
        getUser();

    }, [])


    const avatarURL = "https://randomuser.me/api/portraits/men/36.jpg";

    const handleSignOut = async() => {


        //delete storage
        await EncryptedStorage.removeItem("USER_CREDENTIALS");

        auth
            .signOut()
            .then(() => {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' }],
                })
            })
    }

    const navigateChangePassword = () => {
        props.navigation.navigate("ChangePassword");
    }

    const navigateInbox = () => {
        props.navigation.navigate("ChatScreens");
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
                <Text style={styles.screenHeader}>Profil</Text>
                <TouchableOpacity style={styles.inboxButton} onPress={navigateInbox}>
                    <FontAwesome5
                        name={"inbox"}
                        size={35}>
                    </FontAwesome5>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                    <FontAwesome5
                        name={"sign-out-alt"}
                        size={35}>
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
            <Avatar
                size={Dimensions.get('window').width / 3}
                rounded
                source={require('../assets/images/farmer_pp.png')}
                containerStyle={{ alignSelf: 'center' }}
            >
                <Avatar.Accessory
                    name="plus-circle"
                    type="font-awesome-5"
                    color="#000000"
                    size={32} />
            </Avatar>
            <Text style={styles.profileName}>{user?.name + ' ' + user?.surname}</Text>
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
            <TouchableOpacity style={styles.profileContent} disabled>
                <FontAwesome5 name={"user-circle"} style={styles.iconButtonStyle} size={30} />
                <Text style={styles.profileText}>{auth.currentUser?.displayName}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContent} disabled>
                <FontAwesome5 name={"envelope"} style={styles.iconButtonStyle} size={30} />
                <Text style={styles.profileText}>{auth.currentUser?.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.passwordButton} onPress={navigateChangePassword}>
                <FontAwesome5 name={"unlock-alt"} style={styles.iconButtonStyle} size={25} color={"#ffffff"} />
                <Text style={styles.profileButtonText}>Şifre değiştir</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );

}

export default ProfileScreen;