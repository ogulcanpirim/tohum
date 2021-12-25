import React, {useEffect} from 'react'
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import styles from './styles';
import { auth } from '../../Firebase/firebase';

const WelcomeScreen = (props) => {

    const navigateToRegister = () => {
        props.navigation.navigate("Register");
    }
    const navigateToSignIn = () => {
        props.navigation.navigate("SignIn");
    }

    useEffect(() => {
        
        
        
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user){
                props.navigation.navigate("AppScreens");
            }
        })
        return unsubscribe;
    }, []) 

    return (

        <SafeAreaView>
            <View style={styles.welcomeScreenView}>
                <Text style={styles.welcomeLogoTitle}>
                    tohum
                </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={styles.welcomeSignInButton} onPress={navigateToSignIn}>
                    <Text style={styles.buttonText}>GİRİŞ YAP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.welcomeRegisterButton} onPress={navigateToRegister}>
                    <Text style={styles.buttonText}>KAYIT OL</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

export default WelcomeScreen;