import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import ChatCard from '../components/ChatCardComponent';

const InboxScreen = (props) => {

    const goBack = () => {
        props.navigation.goBack();
    }

    const goChat = () => {
        props.navigation.navigate("ChatScreen");
    }
    
    return(
        <SafeAreaView>
            <TouchableOpacity style = {styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={styles.screenHeaderWithLogo}>Mesajlarım</Text>
            <ScrollView style = {styles.listViewStyle}>
                <ChatCard goChat = {goChat}></ChatCard>
                <ChatCard goChat = {goChat}></ChatCard>
                <ChatCard goChat = {goChat}></ChatCard>
                <ChatCard goChat = {goChat}></ChatCard>
            </ScrollView>
        </SafeAreaView>
    );

}

export default InboxScreen;