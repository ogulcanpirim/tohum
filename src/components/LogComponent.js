import React, { useState } from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';




const LogComponent = (props) => {


    const styles = StyleSheet.create({

        centeredView: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginLeft: 15,
            marginRight: 15,
            marginBottom: '20%',
        },
        modalView: {
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            margin: 15,
            backgroundColor: props.success ? "#26931e" : "red",
            borderRadius: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
        },
    
        textStyle: {
            color: "white",
            fontWeight: "bold",
        },
        modalText: {
            color: "white",
            textAlign: "center"
        }
    });

    
    const setModalVisible = props.setModalVisible;
    const modalVisible = props.modalVisible;
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <FontAwesome5
                            name={"shopping-cart"}
                            size={25}
                            color={"#fff"}>
                        </FontAwesome5>
                        <Text style={styles.modalText}>{props.text}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <FontAwesome5
                                name={"times"}
                                size={25}
                                color={"#fff"}>
                            </FontAwesome5>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    )
}

export default LogComponent;



