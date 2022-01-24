import React, { useEffect } from 'react'
import { SafeAreaView, TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import styles from './styles';
import EncryptedStorage from 'react-native-encrypted-storage';
import { auth} from '../../Firebase/firebase';
import SplashScreen from 'react-native-splash-screen';

const WelcomeScreen = (props) => {

    const navigateToRegister = () => {
        props.navigation.navigate("Register");
    }
    const navigateToSignIn = () => {
        props.navigation.navigate("SignIn");
    }

    useEffect(() => {

        
        const checkUser = async () => {

            const userCredentialsStorage = await EncryptedStorage.getItem("USER_CREDENTIALS");

            if (userCredentialsStorage) {
                
                const userCredentials = JSON.parse(userCredentialsStorage);
                const user = userCredentials.user;
                const password = userCredentials.password;

                auth
                    .signInWithEmailAndPassword(user.email, password)
                    .then(() => {
                        props.navigation.navigate("AppScreens");
                    }
                    ).catch(() => {
                        console.log("hide ?");
                        SplashScreen.hide();
                    });
            }
        }
        checkUser();
        SplashScreen.hide();
        
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