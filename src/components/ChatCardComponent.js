import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { Avatar } from "react-native-elements";

const ChatCard = (props) => {

    return (
        <TouchableOpacity onPress={props.goChat}>
            <View style={{...styles.chatCardContainer, backgroundColor: props.theme.colors.cardBackground}}>

                <Avatar
                    size={Dimensions.get('window').height / 15}
                    rounded
                    source={ props.avatar ? {uri: props.avatar} : require('../assets/images/farmer_pp.png')}
                    containerStyle={styles.avatarContainer}
                >
                </Avatar>
                <View style={styles.textContainer}>
                    <Text style={{...styles.usernameStyle, color: props.theme.colors.text}}>
                        {props.name + ' ' + props.surname}
                    </Text>
                    <Text style={{...styles.lastTextStyle, color: props.theme.colors.text}}>
                        {props.lastMessage}
                    </Text>
                </View>
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

});

export default ChatCard;