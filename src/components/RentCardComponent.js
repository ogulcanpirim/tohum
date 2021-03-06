import React from "react";
import { Dimensions, View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";


const styles = StyleSheet.create({

    container: {
        flex: 1,
        margin: 15,
        height: Dimensions.get("window").height / 5,
        shadowColor: '#000',
        shadowOpacity: .2,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        borderRadius: 10,
        flexDirection: 'row'

    },
    imageContainer: {
        width: '45%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },

    cardContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderRadius: 10,
    },

    headerStyle: {
        fontSize: 15,
        fontWeight: '600',
    },

    priceContainer: {
        position: 'absolute',
        bottom: '20%',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    price: {
        fontSize: 20,
        fontWeight: '600',
        marginRight: 10,
    },

    userText: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        fontSize: 12,
        color: '#5E72E4',
        fontWeight: '600',
    },

})

const RentCardComponent = (props) => {

    return (
        <TouchableOpacity style={{...styles.container, backgroundColor: props.theme.colors.cardBackground}} onPress={props.goItem}>
            <Image style={styles.imageContainer} source={{ uri: props.image }} />
            <View style={styles.cardContainer}>
                <View style={{...styles.header, borderColor: props.theme.colors.line}}>
                    <Text style={{...styles.headerStyle, color: props.theme.colors.text}}>{props.title}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={{...styles.price, color: props.theme.colors.text}}>{props.price + " ₺"}</Text>
                    <Text style={{...styles.priceText, color: props.theme.colors.text}}>/ günlük</Text>
                </View>
                <Text style={styles.userText}onPress={() => { }}>{props.user}</Text>
            </View>
        </TouchableOpacity>
    );

}

export default RentCardComponent;