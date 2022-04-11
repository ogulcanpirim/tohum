import React, { useState, useCallback } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ChatCard from '../components/ChatCardComponent';
import { auth, db } from '../../Firebase/firebase';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const InboxScreen = (props) => {

    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hiddenItemVisible, setHiddenItemVisible] = useState(false);

    const storage = getStorage();


    //will do later...
    const getLastMessage = async (chatId) => {

        const res = await db.collection("chats" + "/" + chatId + "/" + "messages").orderBy("createdAt", "desc").limit(1).get();
        return res.docs[0].data().text;

    }

    const getChatUser = async (chatId) => {
        const res = await db.collection("users").doc(chatId).get();
        const userRef = ref(storage, chatId + '/profile.png');
        const avatar = await getDownloadURL(userRef);
        return {...res.data(), avatar};
    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            const unsubscribe =
                db.collection("chats")
                    .where("users", "array-contains", auth.currentUser?.uid)
                    .onSnapshot(async (querySnapshot) => {

                        const promise = querySnapshot.docs.map(async (doc) => {
                            const chatUserId = doc.data().users.filter(item => item != auth.currentUser?.uid)[0];
                            const chatUser = await getChatUser(chatUserId);

                            data = {
                                id: doc.id,
                                lastMessage: "blabla",
                                name: chatUser.name,
                                surname: chatUser.surname,
                                avatar: chatUser.avatar,
                            };

                            appendChats(data);

                        });
                        await Promise.all(promise).then(() => {
                            setLoading(false);
                        });
                    
                    });
            return () => {
                unsubscribe();
            };
        }, [chats])
    );
    const appendChats = useCallback((data) => {
        //encounter two children with same key
        if (!chats.filter(item => item.id === data.id).length) {
            setChats(prev => [...prev, data])
        }
    }, [chats]);


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

    const deleteChat = async (chatId) => {
        await deleteMessages(chatId);
        await db.collection("chats").doc(chatId).delete();
        setChats(prev => prev.filter(item => item.id !== chatId));
    }


    const deleteMessages = async (chatId) => {
        const res = await db.collection(`chats/${chatId}/messages`).get();
        res.forEach(element => {
            element.ref.delete();
        });
    }

    const EmptyListScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons
                    name={"chat-remove-outline"}
                    size={50}
                    color={"#cad1d7"}
                />
                <Text style={{ fontSize: 18, color: "#cad1d7", marginTop: 15 }}>Mesaj kutusu boş !</Text>
            </View>
        );
    }

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onClose={() => closeRow(rowMap, data.item.id)}
                onDelete={() => deleteRow(rowMap, data.item.id)}
            />
        );
    }

    const HiddenItemWithActions = props => {
        const {
            onDelete,
        } = props;

        if (!hiddenItemVisible) {
            return null;
        }

        return (
            <TouchableOpacity onPress={onDelete} style={styles.rowBack}>
                <View style={[styles.userFormRightBtn, styles.userFormRightBtnRight]}>
                    <FontAwesome5
                        name={"trash-alt"}
                        color={"#fff"}
                        size={25}>
                    </FontAwesome5>
                </View>
            </TouchableOpacity>
        );
    }
    const deleteRow = (rowMap, rowKey) => {
        const item = rowMap[rowKey]?.props.item;
        Alert.alert(
            "Konuşmayı Sil",
            'Seçilen konuşmayı silmek istiyor musunuz?'
            , [
                {
                    text: 'Vazgeç',
                    onPress: () => { closeRow(rowMap, rowKey) },
                    style: 'cancel',
                },
                {
                    text: 'Sil',
                    onPress: () => { deleteChat(item.id) },
                    style: 'destructive'
                },
            ]);
    };

    const onSwipeValueChange = ({ value }) => {
        setHiddenItemVisible(value != 0);
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };


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
            <Text style={styles.screenHeaderWithLogo}>Mesajlarım</Text>
            {loading ? <LoadingScreen /> : (chats.length !== 0 ?
                <SwipeListView
                    style={{ padding: 15 }}
                    data={chats}
                    renderItem={(chat) => (
                        <ChatCard
                            key={chat.item.id}
                            name={chat.item.name}
                            surname={chat.item.surname}
                            lastMessage={chat.item.lastMessage}
                            avatar={chat.item.avatar}
                            goChat={() => { props.navigation.navigate("ChatScreen", { ...chat.item}) }}
                        />
                    )
                    }
                    renderHiddenItem={renderHiddenItem}
                    onSwipeValueChange={onSwipeValueChange}
                    keyExtractor={(item) => item.id}
                    rightOpenValue={-75}
                /> : <EmptyListScreen />)}
        </SafeAreaView>
    );

}

export default InboxScreen;