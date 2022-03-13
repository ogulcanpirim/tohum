import React from "react";
import { View, Dimensions, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-elements";
import Feather from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
    container: {
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
        padding: 15,
    },

    userName: {
        marginLeft: 15,
        fontWeight: '500',
        fontSize: 18,
    },

    choiceContainer: {
        position: 'absolute',
        marginLeft: 30,
        height: '100%',
        width: '40%',
        right: '5%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    }
});

const FriendRequestCard = (props) => {

    
    return (
        <View style={styles.container}>
            <Avatar
                size={Dimensions.get('window').width / 7}
                rounded
                source={require('../assets/images/farmer_pp.png')}
                containerStyle={{ alignSelf: 'center' }}
            />
            <Text style={styles.userName}>{props.name}</Text>
            <View style={styles.choiceContainer}>                
                <TouchableOpacity onPress={props.handleAccept}>
                    <Feather
                        size={30}
                        name={"check-circle"}
                        color={"#26931e"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={props.handleReject}>
                    <Feather
                        size={30}
                        name={"slash"}
                        color={"#a70000"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FriendRequestCard;