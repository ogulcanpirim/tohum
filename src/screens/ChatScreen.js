import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { ActivityIndicator, View, StyleSheet, Platform, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Text, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { db, auth } from '../../Firebase/firebase';
import { useRoute } from '@react-navigation/native';

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


  const route = useRoute();
  const [chatUser, setChatUser] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  async function getUserData(uid) {
    const response = await db.collection("users").doc(uid).get();
    return response.data();
  }

  //load earlier messages
  useEffect(() => {
    //load user
    (async () => {
      const user = await getUserData(auth.currentUser?.uid);

      const selfUser = {
        _id: auth.currentUser?.uid,
        name: user.name + ' ' + user.surname
        //add avatar
      }
      console.log(">>" + JSON.stringify(selfUser));
      setChatUser(route.params.chatUser);
      setUser(selfUser);
    })();


  }, [])

  //load earlier messages
  useEffect(() => {
    (async () => {
      const earlierMessages = route.params.messages;
      console.log("earlierMessages: " + JSON.stringify(earlierMessages));
      const writes = earlierMessages.sort((a, b) => new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime())
      await Promise.all(writes);
      console.log("writes: " + JSON.stringify(writes));
      setMessages(earlierMessages);
    })();
  }, [route.params.messages])

  /*
  useEffect(() => {

    readUser();
    const unsubscribe = chatsRef.onSnapshot(querySnapshot => {
      const messagesFirestore = querySnapshot
      .docChanges()
      .filter(({type}) => type === 'added')
      .map(({doc}) => {
        const message = doc.data();
        return {...message, createdAt: message.createdAt.toDate()}
      })
      .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messagesFirestore);
    })
    return unsubscribe; 
  }, []);
  */




  function handleSend(message) {
    console.log("route.params.id: " + route.params.id);
    console.log("messages old: " + messages);
    console.log("new message: " + JSON.stringify(message));
    const newMessages = [...messages, ...message];
    console.log("new messages after added: " + JSON.stringify(newMessages));
    //db.collection("chats").doc(route.params.id).update({deneme: 3});
    appendMessages(message);
    console.log("yeni mesaj ekledim...");
  }

  const appendMessages = useCallback((messages) => {
    console.log("yeni mesaj ekliyorum...");
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



  return (

    <SafeAreaView style={{ flex: 1 }}>
      <Header />
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
        }} />
      {
        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
      }
    </SafeAreaView>
  );

}

export default ChatScreen;