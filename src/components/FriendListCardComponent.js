import React from "react";
import { Dimensions, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Avatar } from "react-native-elements";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
        padding: 15,
        alignItems: 'center',
    },
    userName: {
        marginLeft: 15,
        fontWeight: '500',
        fontSize: 18,
    },

    chatLogo: {
        position: 'absolute',
        right: '10%'
    }
})


const FriendListCard = (props) => {

    const {theme} = props;
    return (
        <TouchableOpacity>
            <View style={{...styles.container, backgroundColor: theme.colors.cardBackground}}>
                <Avatar
                    size={Dimensions.get('window').width / 7}
                    rounded
                    source={require('../assets/images/farmer_pp.png')}
                    containerStyle={{ alignSelf: 'center' }}
                />
                <Text style={{...styles.userName, color: theme.colors.text}}>{props.name}</Text>
                <TouchableOpacity style={styles.chatLogo} onPress={props.goChat}>
                    <MaterialCommunityIcons
                        name={"chat-plus"}
                        size={30}
                        color={"#26931e"}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

export default FriendListCard;