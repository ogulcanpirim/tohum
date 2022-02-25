import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { ActivityIndicator, View, StyleSheet, Platform, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, auth } from '../../Firebase/firebase';
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


const ChatScreen = (props) => {

  /*
    sort messages PARTIALLY CHAT USER MESSAGES COME LAST
    earlier messages avatar problem
    encounter same key DONE
    chatUser DONE
    earlierMessages DONE
    loading
    real-time message
    append message to firebase DONE
    append message to screen DONE
  */
  const route = useRoute();
  const [chatUser, setChatUser] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUserData(uid) {
    const response = await db.collection("users").doc(uid).get();
    return response.data();
  }

  useEffect(() => {
    setChatUser({ name: route.params.name, surname: route.params.surname });
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
    console.log("id: " + route.params.id);
    const unsubscribe = db.collection("chats")
      .where("chatId", "==", route.params.id)
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        const messagesFirestore = querySnapshot
          .docChanges()          
          .filter(({ type }) => type === 'added')
          .map(({ doc }) => {
            const { createdAt, user, ...message} = doc.data();
            //encounter two children with same key on save
            if (!messages.find(message => message._id === doc.id)) {
              return {
                _id: doc.id,
                createdAt: createdAt.toDate(),
                user: {avatar: user.avatar ? user.avatar : require('../assets/images/farmer_pp.png'), ...user},
                ...message
              }
            }
          })
          //remove null
          .filter(element => element)
        console.log("messages firebase come: " + JSON.stringify(messagesFirestore));
        appendMessages(messagesFirestore);
        setLoading(false);
      })

    return () => unsubscribe();
  }, []);


  async function handleSend(messages) {
    const writes = messages.map(({ _id, ...message }) => db.collection("chats").doc(_id).set({ chatId: route.params.id, ...message }));
    await Promise.all(writes);
    //appendMessages(messages); not necessary ?
  }

  const appendMessages = useCallback((messages) => {
    console.log("append messages : " + JSON.stringify(messages));
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
        <Text style={styles.nameText}>{chatUser?.name + ' ' + chatUser?.surname}</Text>
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



  return (

    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      {loading ? <LoadingScreen /> :
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          renderUsernameOnMessage
          showAvatarForEveryMessage
          user={user}
          inverted={true}
          scrollToBottom
          isAnimated
          showUserAvatar
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

export default ChatScreen;