import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat'
import { ActivityIndicator, View, StyleSheet, Platform, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, auth } from '../../Firebase/firebase';
import { arrayUnion } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import tr from 'dayjs/locale/tr'
import { useTheme } from '@react-navigation/native';



const styles = StyleSheet.create({

    headerStyle: {
        borderBottomWidth: 1,
    },

    nameText: {
        padding: 20,
        fontSize: 20,
        fontFamily: 'Comfortaa-Regular',
        fontWeight: '400',
        alignSelf: 'center',
        textAlign: 'center',
    }
});


const FormChatScreen = (props) => {

    const route = useRoute();
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formTitle, setFormTitle] = useState(null);
    const theme = useTheme();

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
            <View style={{ ...styles.headerStyle, borderColor: theme.colors.border }}>
                <TouchableOpacity style={{ position: 'absolute', padding: 15 }} onPress={goBack}>
                    <AntDesign
                        name={"back"}
                        color={theme.colors.text}
                        size={35}>
                    </AntDesign>
                </TouchableOpacity>
                <Text style={{ ...styles.nameText, color: theme.colors.text }}>{formTitle}</Text>
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
            props.navigation.navigate("AppScreens", { screen: "Profil" });
        }
        else {
            props.navigation.navigate("UserScreen", { ...user })
        }
    }

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}
                primaryStyle={{ alignItems: 'center', backgroundColor: theme.colors.background, color: "#fff" }}
            >
            </InputToolbar>
        );
    }

    const renderSend = (props) => {
        return (
            <Send
                label="G??nder"
                alwaysShowSend={false}
                textStyle={{ color: "#26931e" }}
                {...props}
            >
            </Send>
        );
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
                    renderInputToolbar={renderInputToolbar}
                    textInputProps={{ color: theme.colors.text }}
                    placeholder={'Mesaj??n??z?? yaz??n??z...'}
                    renderSend={renderSend}
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