import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from './styles';




const ProfileScreen = (props) => {


    const logOut = () => {
        props.navigation.navigate("Welcome");
    }

    const navigateChangePassword = () => {
        props.navigation.navigate("ChangePassword");
    }


    return(
        <SafeAreaView>
             <Text style={styles.screenHeader}>Profil</Text>
             <TouchableOpacity style = {styles.exitButton} onPress={logOut}>
                 <Text style = {styles.buttonText}> ÇIKIŞ YAP</Text>
             </TouchableOpacity>
             <TouchableOpacity style = {styles.passwordButton} onPress={navigateChangePassword}>
                 <Text style = {styles.buttonText}> ŞİFRE DEĞİŞTİR</Text>
             </TouchableOpacity>
        </SafeAreaView>
    );

}

export default ProfileScreen;