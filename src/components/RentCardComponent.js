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


    const image = "https://picsum.photos/1200/600";

    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.imageContainer} source={{ uri: image }} />
            <View style={styles.cardContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerStyle}>New Holland CR - CX Marka Biçerdöver</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>500₺</Text>
                    <Text style={styles.priceText}>/ günlük</Text>
                </View>
                <Text style={styles.userText}onPress={() => { }}>Hasan Berkay Demircan</Text>
            </View>
        </TouchableOpacity>
    );

}

export default RentCardComponent;