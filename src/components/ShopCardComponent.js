import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Avatar } from "react-native-elements";

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

    priceText: {
        fontWeight: '500',
        fontSize: 18,
        position: 'absolute',
        alignSelf: 'center',
        right: '5%'
    },
})




const ShopCardComponent = (props) => {

    const itemURL = "https://picsum.photos/1200/600";


    return (
        <View style={styles.container}>
            <Avatar
                size={Dimensions.get('window').height / 15}
                rounded
                source={{ uri: itemURL }}
                containerStyle={styles.avatarContainer}
            >
            </Avatar>
            <View style={styles.textContainer}>
                <Text style={styles.usernameStyle}>
                    Katı Gübre
                </Text>
                <Text style={styles.lastTextStyle}>
                    Adet: 2
                </Text>
            </View>
            <Text style={styles.priceText}>12.99₺</Text>
        </View>
    );
}

export default ShopCardComponent;