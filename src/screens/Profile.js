import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from './styles';




const ProfileScreen = (props) => {


    const logOut = () => {
        props.navigation.navigate("Welcome");
    }


    return(
        <SafeAreaView>
             <Text style={styles.textStyle}>Profil</Text>
             <TouchableOpacity style = {styles.exitButton} onPress={logOut}>
                 <Text styles>ÇIKIŞ YAP</Text>
             </TouchableOpacity>
        </SafeAreaView>
    );

}

export default ProfileScreen;