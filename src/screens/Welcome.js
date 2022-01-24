import React, { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import styles from './styles';
import EncryptedStorage from 'react-native-encrypted-storage';
import { auth, firebaseAuth } from '../../Firebase/firebase';
import { reauthenticateWithCredential } from 'firebase/auth';

const WelcomeScreen = (props) => {


    const [loading, setLoading] = useState(true);


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
                        console.log("giris yapti !");
                        props.navigation.navigate("AppScreens");
                    }
                    )
                    .catch(error => {
                        console.log("giris yapamadi !");
                        console.log(error);
                        setLoading(false);                
                    })
            }
            setLoading(false);
        }
        checkUser();
        

    }, [])

    
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }
    


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