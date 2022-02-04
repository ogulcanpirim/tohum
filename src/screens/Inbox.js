import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, ActivityIndicator, Modal, Pressable } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import ChatCard from '../components/ChatCardComponent';
import { auth, db } from '../../Firebase/firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const InboxScreen = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);

    //get chat list
    useEffect(() => {
        setLoading(true);
        let data = [];
        const unsubscribe =
            db.collection("chats")
                .where("users", "array-contains", auth.currentUser?.uid)
                .onSnapshot((querySnapshot) => {
                    querySnapshot.docs.map(async (e) => {
                        const chatUserId = e.data().users.filter(x => auth.currentUser?.uid !== x)[0]
                        const chatUser = { ...await getUserData(chatUserId), chatUserId };
                        data = {
                            chatUser: chatUser,
                            id: e.id,
                            messages: e.data().messages
                        };
                        setChats(prev => [...prev, data])
                    })
                    setLoading(false);
                })
        return unsubscribe;
    }, []);


    //get chat user id
    async function getUserData(uid) {
        const response = await db.collection("users").doc(uid).get();
        return response.data();
    }


    const ModalComponent = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Yeni mesaj ekle!</Text>
                        <TouchableOpacity onPress={() => {setModalVisible(false)}}>
                            <Text>Kapat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    const goBack = () => {
        props.navigation.goBack();
    }

    const LoadingScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ModalComponent/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                    <AntDesign
                        name={"back"}
                        size={35}>
                    </AntDesign>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addFormButton} onPress={() => setModalVisible(true)}>
                    <FontAwesome5
                        name={"plus-circle"}
                        size={35}
                        color={"#26931e"}>
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
            <Text style={styles.screenHeaderWithLogo}>Mesajlarım</Text>
            {loading ? <LoadingScreen /> : <ScrollView style={styles.listViewStyle}>
                {chats.map(chat => {
                    return (
                        <ChatCard
                            key={chat.id}
                            name={chat.chatUser?.name}
                            surname={chat.chatUser?.surname}
                            lastMessage="blabla"
                            goChat={() => props.navigation.navigate("ChatScreen", { ...chat })}
                        />
                    );
                })}
            </ScrollView>}
        </SafeAreaView>
    );

}

export default InboxScreen;