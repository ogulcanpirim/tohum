import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, StyleSheet, Platform, SafeAreaView, TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({

  headerStyle: {
    height: 200,
    backgroundColor: '#2f2f2f',
  },

});


const ChatScreen = (props) => {
  
  const goBack = () => {
    props.navigation.goBack();
  }


  const Header = () => {

    return (
      <View style={styles.headerStyle}>
        <TouchableOpacity style = {{padding: 15}} onPress={goBack}>
                  <AntDesign
                      name={"back"}
                      size={35}>
                  </AntDesign>
        </TouchableOpacity>
      </View>
    );
  }
  
  
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <Header></Header>
      <GiftedChat 
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }} 
        scrollToBottom
        isAnimated/>
      {
        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
      }
    </SafeAreaView>
  );
  
}

export default ChatScreen;