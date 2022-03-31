import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { ActivityIndicator, View, StyleSheet, Platform, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, auth } from '../../Firebase/firebase';
import { arrayUnion } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import tr from 'dayjs/locale/tr'

const styles = StyleSheet.create({

    headerStyle: {
        borderBottomWidth: 1,
    },

    nameText: {
        padding: 20,
        fontSize: 25,
        fontFamily: 'Comfortaa-Regular',
        fontWeight: '400',
        alignSelf: 'center',
        textAlign: 'center',

    }
});


const FormChatScreen = (props) => {

    const route = useRoute();
    const [formTitle, setFormTitle] = useState(null);
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getUserData(uid) {
        const response = await db.collection("users").doc(uid).get();
        return response.data();
    }

    useEffect(() => {
        setFormTitle(route.params.title);

        //load user
        (async () => {
            const user = await getUserData(auth.currentUser?.uid);

            setUser({
                _id: auth.currentUser?.uid,
                name: user.name + ' ' + user.surname,
                avatar: auth.currentUser?.photoURL || require('../assets/images/farmer_pp.png')
            });
        })();
    }, []);

    useEffect(() => {
        const unsubscribe = db.collection("forms" + "/" + route.params.id + "/" + "messages")
            .orderBy("createdAt", "desc")
            .onSnapshot(querySnapshot => {
                const messagesFirestore = querySnapshot
                    .docChanges()
                    .filter(({ type }) => type === 'added')
                    .map(({ doc }) => {
                        const { createdAt, user, ...message } = doc.data();
                        //encounter two children with same key on save
                        if (!messages.find(message => message._id === doc.id)) {
                            return {
                                _id: doc.id,
                                createdAt: createdAt.toDate(),
                                user: { avatar: (user.avatar?.toString().includes('https') ? user.avatar : require('../assets/images/farmer_pp.png')), ...user },
                                ...message
                            }
                        }
                    })
                    //remove null
                    .filter(element => element)
                appendMessages(messagesFirestore);
                setLoading(false);
            })

        return () => {
            unsubscribe();
        }
    }, []);


    async function handleSend(messages) {
        //add user to users array
        await db.collection("forms").doc(route.params.id).update({ users: arrayUnion(auth.currentUser?.uid) });
        const writes = messages.map(({ _id, ...message }) => db.collection("forms" + "/" + route.params.id + "/messages").doc(_id).set({ ...message }));
        await Promise.all(writes);
    }

    const appendMessages = useCallback((messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    }, [messages]);


    const goBack = () => {
        props.navigation.goBack();
    }


    const Header = () => {

        return (
            <View style={styles.headerStyle}>
                <TouchableOpacity style={{ position: 'absolute', padding: 15 }} onPress={goBack}>
                    <AntDesign
                        name={"back"}
                        size={35}>
                    </AntDesign>
                </TouchableOpacity>
                <Text style={styles.nameText}>{formTitle}</Text>
            </View>
        );
    }

    const LoadingScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }

    const onAvatarPress = (user) => {
        if (user._id == auth.currentUser?.uid) {
            props.navigation.navigate("Profile_Entrance", {screen: "Profile_Entrance"});
        }
        else {
            props.navigation.navigate("UserScreen", { ...user })
        }
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            {loading ? <LoadingScreen /> :
                <GiftedChat
                    messages={messages}
                    onSend={handleSend}
                    renderUsernameOnMessage
                    user={user}
                    inverted={true}
                    scrollToBottom
                    isAnimated
                    showUserAvatar
                    onPressAvatar={(user) => { onAvatarPress(user) }}
                    locale={tr.name}
                    renderBubble={props => {
                        return (
                            <Bubble
                                {...props}

                                wrapperStyle={{
                                    left: {
                                        backgroundColor: '#1d6d17',
                                    },
                                    right: {
                                        backgroundColor: "#26931e",
                                    },
                                }}
                                textStyle={{
                                    left: {
                                        color: '#fff',
                                    },
                                    right: {
                                        color: '#fff',
                                    },
                                }}
                            />
                        );
                    }} />}
            {
                Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
            }
        </SafeAreaView>
    );

}

export default FormChatScreen;