import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View, ActivityIndicator, Modal, Pressable } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ChatCard from '../components/ChatCardComponent';
import { auth, db } from '../../Firebase/firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const InboxScreen = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);

    const getLastMessage = async (chatId) => {

        return db.collection("chats")
            .where("chatId", "==", chatId)
            .orderBy("createdAt", "desc")
            .limit(1)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    return querySnapshot.docs[0].data().text;
                }
            })

    }

    const getChatUser = async (chatId) => {

        return db.collection("chats")
            .where("chatId", "==", chatId)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    return querySnapshot.docs.filter(item => item.data().user._id != auth.currentUser?.uid)[0].data().user.name;
                }
            })
    }

    //deneme
    useEffect(() => {
        setLoading(true);
        const unsubscribe =
            db.collection("chats")
                .where("user._id", "==", auth.currentUser?.uid)
                .onSnapshot(async (querySnapshot) => {
                    const chatIds = [...new Set(querySnapshot.docs.map(item => item.data().chatId))];

                    const requests = chatIds.map(async (chat) => {
                        const user = await getChatUser(chat);
                        const chatUser = user.split(' ');
                        const lastMessage = await getLastMessage(chat);

                        data = {
                            id: chat,
                            lastMessage: lastMessage,
                            name: chatUser[0],
                            surname: chatUser[1],
                        }
                        console.log("data: " + JSON.stringify(data));
                        appendChats(data);

                    })
                    await Promise.all(requests).then(() => {
                        setLoading(false);
                    });
                })
        return () => unsubscribe();
    }, [])

    const appendChats = useCallback((data) => {
        //encounter two children with same key
        if (!chats.filter(item => item.id === data.id).length) {
            setChats(prev => [...prev, data])
        }
    }, [chats]);


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
                        <TouchableOpacity onPress={() => { setModalVisible(false) }}>
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
            <ModalComponent />
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
            {loading ? <LoadingScreen /> :
                <FlatList style={{ padding: 15 }}
                    data={chats}
                    renderItem={(chat) => {
                        console.log("chat" + JSON.stringify(chat));
                        return (
                            <ChatCard
                                key={chat.item.id}
                                name={chat.item.name}
                                surname={chat.item.surname}
                                lastMessage={chat.item.lastMessage}
                                goChat={() => { props.navigation.replace("ChatScreen", { ...chat.item }) }}
                            />
                        )
                    }}
                    keyExtractor={(item) => item.id}
                />}
        </SafeAreaView>
    );

}

export default InboxScreen;