import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const styles = StyleSheet.create({

    formCardContainer: {
        width: '100%',
        alignSelf: 'center',
        height: Dimensions.get('window').height / 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: .1,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    forumHeader: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: '5%',
        marginLeft: '5%'
    },

    messageStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        right: "100%"
    },

    personStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconInfoStyle: {
        flexDirection: 'row',
    },
    numberStyle: {
        fontSize: 16,
        marginTop: '10%',
        fontWeight: '500',
    },
    headerLine: {
        height: 1,
        backgroundColor: '#2f2f2f',
        opacity: .2,
        width: '90%',
        alignSelf: 'center',
        marginTop: '5%'
    },

    dateText: {
        marginTop: '5%',
        marginLeft: '5%',
        color: '#2f2f2f',
        opacity: .2,
    }
    
});



const FormCardComponent = (props) => {

    return (
        <TouchableOpacity>
            <View style={styles.formCardContainer}>
                <View>
                    <Text style={styles.forumHeader}>Rize Bölgesinde Yağmur</Text>
                    <View style = {styles.headerLine}></View>
                    <Text style = {styles.dateText}>21/10/2021</Text>
                </View>
                
                <View style={styles.iconInfoStyle}>
                    <View style={styles.personStyle}>
                        <FontAwesome5
                            name={"user-alt"}
                            size={30}
                        ></FontAwesome5>
                        <Text style={styles.numberStyle}>412</Text>
                    </View>
                    <View style={styles.messageStyle}>
                        <FontAwesome
                            name={"comments"}
                            size={30}
                            color="#26931e"
                        ></FontAwesome>
                        <Text style={styles.numberStyle}>123</Text>
                    </View>
                </View>
                
            </View>
        </TouchableOpacity >

    );
}

export default FormCardComponent;