import React from 'react'
import { SafeAreaView, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const WelcomeScreen = (props) => {

    const navigateToRegister = () => {
        props.navigation.navigate("Register");
    }
    const navigateToSignIn = () => {
        props.navigation.navigate("SignIn");
    }
    return (
        <SafeAreaView>
            <TouchableOpacity style = {styles.registerButton} onPress={navigateToRegister}>
                <Text style = {styles.registerButtonText}>KAYIT OL</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.signinButton} onPress={navigateToSignIn}>
                <Text style = {styles.registerButtonText}>GİRİŞ YAP</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default WelcomeScreen;