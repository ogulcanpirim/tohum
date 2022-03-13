import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { Avatar } from "react-native-elements";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ChatCard = (props) => {

    const avatarURL = "https://randomuser.me/api/portraits/men/22.jpg";

    return (
        <TouchableOpacity onPress={props.goChat}>
            <View style={styles.chatCardContainer}>

                <Avatar
                    size={Dimensions.get('window').height / 15}
                    rounded
                    source={{ uri: avatarURL }}
                    containerStyle={styles.avatarContainer}
                >
                </Avatar>
                <View style={styles.textContainer}>
                    <Text style={styles.usernameStyle}>
                        {props.name + ' ' + props.surname}
                    </Text>
                    <Text style={styles.lastTextStyle}>
                        {props.lastMessage}
                    </Text>
                </View>
                <TouchableOpacity style={styles.trashLogo}>
                    <FontAwesome5
                        name={"trash-alt"}
                        color={"#a70000"}
                        size={25}>
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    chatCardContainer: {
        width: '100%',
        flex: 1,
        alignSelf: 'center',
        height: Dimensions.get('window').height / 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: .1,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
    },
    avatarContainer: {
        marginLeft: 15,
        alignSelf: 'center',
    },
    textContainer: {
        marginLeft: 15,
        flex: 1,
        justifyContent: 'center',

    },
    usernameStyle: {
        fontWeight: '700',
        fontSize: 16
    },
    lastTextStyle: {
        fontWeight: '300'
    },
    trashLogo: {
        position: 'absolute',
        right: '10%'
    }

});

export default ChatCard;