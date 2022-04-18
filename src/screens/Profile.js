import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-elements';
import { Dimensions } from 'react-native';
import { auth, db } from '../../Firebase/firebase';
import EncryptedStorage from 'react-native-encrypted-storage';
import ProfilePictureComponent from '../components/ProfilePictureComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

const ProfileScreen = (props) => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [friendCount, setFriendCount] = useState(0);
    const [friendData, setFriendData] = useState([]);
    const [friendRequestBadge, setFriendRequestBadge] = useState(0);
    const ref = useRef();
    const theme = useTheme();
    
    
    useEffect(() => {
        const getUser = async () => {
            ref.current = db.collection("users").doc(auth.currentUser?.uid).onSnapshot(doc => {
                const user = doc.data();
                setUser(user);
            })
        }
        getUser();

    }, []);
    
    
    useFocusEffect(
        useCallback(() => {
            ref.current = db.collection("friendships")
                .doc(auth.currentUser.uid)
                .onSnapshot(async (querySnapshot) => {
                    if (querySnapshot.exists) {
                        const data = querySnapshot.data();
                        const count = Object.values(data).filter(item => item == 1).length;
                        await Promise.all(count);
                        const requestCount = Object.values(data).length - count;
                        setFriendRequestBadge(requestCount);
                        setFriendCount(count);
                        //send friend data to list
                        if (count != friendData.length) {
                            for (const key in data) {
                                if (data[key] == 1) {
                                    const user = await getUserData(key);
                                    const item = {
                                        id: key,
                                        name: user.name + ' ' + user.surname
                                    };
                                    appendFriendData(item);
                                }
                            }
                        }
                    }

                    setLoading(false);
                });
            return () => {
                ref.current();
            };
        }, [friendData])
    );
    

    const handleSignOut = async () => {
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

    async function getUserData(uid) {
        const response = await db.collection("users").doc(uid).get();
        return response.data();
    }

    const appendFriendData = useCallback((friendData) => {
        setFriendData((previousData) => [friendData, ...previousData]);
    }, [friendData]);

    const navigateChangePassword = () => {
        props.navigation.navigate("ChangePassword");
    }

    const navigateInbox = () => {
        props.navigation.navigate("ChatScreens");
    }

    const navigateFriendRequest = () => {
        props.navigation.navigate("FriendRequestScreen", { ...user });
    }

    const navigateFriendList = () => {
        props.navigation.navigate("FriendListScreen", { friendData });
    }
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }

    return (
        <SafeAreaView style={modalVisible ? { opacity: 0.1 } : {}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{...styles.screenHeader, color: theme.colors.text}}>Profil</Text>
                <View style={{ width: '35%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 15 }}>
                    <TouchableOpacity onPress={navigateInbox}>
                        <FontAwesome5
                            name={"inbox"}
                            color={theme.colors.text}
                            size={32}>
                        </FontAwesome5>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>3</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateFriendRequest}>
                        <Ionicons
                            name={"person-add"}
                            color={theme.colors.text}
                            size={32}>
                        </Ionicons>
                        {friendRequestBadge > 0 ? <View style={styles.badge}>
                            <Text style={styles.badgeText}>{friendRequestBadge}</Text>
                        </View> : undefined}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignOut}>
                        <FontAwesome5
                            name={"sign-out-alt"}
                            color={theme.colors.text}
                            size={32}>
                        </FontAwesome5>
                    </TouchableOpacity>
                </View>
            </View>
            <Avatar
                size={Dimensions.get('window').width / 3}
                rounded
                source={auth.currentUser?.photoURL ? { uri: auth.currentUser?.photoURL } : require('../assets/images/farmer_pp.png')}
                containerStyle={{ alignSelf: 'center' }}
            >
                <Avatar.Accessory
                    name="plus-circle"
                    type="font-awesome-5"
                    color="#000000"
                    onPress={() => setModalVisible(true)}
                    size={32} />
            </Avatar>
            <Text style={{...styles.profileName, color: theme.colors.text}}>{user?.name + ' ' + user?.surname}</Text>
            <View style={{...styles.profileLine, borderColor: theme.colors.text}} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={navigateFriendList}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', padding: Dimensions.get('window').height / 50 }}>
                        <Text style={{...styles.profileTextVariable, color: theme.colors.text}}>{friendCount}</Text>
                        <Text style={{...styles.profileTextConstant, color: theme.colors.text}}>Takipçi</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', padding: Dimensions.get('window').height / 50 }}>
                    <Text style={{...styles.profileTextVariable, color: theme.colors.text}}>89</Text>
                    <Text style={{...styles.profileTextConstant, color: theme.colors.text}}>Forum Cevabı</Text>
                </View>
            </View>
            <TouchableOpacity style={{...styles.profileContent, borderColor: theme.colors.border}} disabled>
                <FontAwesome5 name={"user-circle"} color={theme.colors.text} style={styles.iconButtonStyle} size={30} />
                <Text style={{...styles.profileText, color: theme.colors.text}}>{auth.currentUser?.displayName}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.profileContent, borderColor: theme.colors.border}} disabled>
                <FontAwesome5 name={"envelope"} color={theme.colors.text} style={styles.iconButtonStyle} size={30} />
                <Text style={{...styles.profileText, color: theme.colors.text}}>{auth.currentUser?.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.passwordButton} onPress={navigateChangePassword}>
                <FontAwesome5 name={"unlock-alt"} color={"#fff"} style={styles.iconButtonStyle} size={25} />
                <Text style={styles.profileButtonText}>Şifre değiştir</Text>
            </TouchableOpacity>
            {modalVisible ? <ProfilePictureComponent theme={theme} modalVisible={modalVisible} setModalVisible={setModalVisible} /> : undefined}
        </SafeAreaView >
    );

}

export default ProfileScreen;