import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth } from '../../Firebase/firebase';

const SignInScreen = (props) => {


    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setLoading(false);
                props.navigation.navigate("AppScreens");
            }
        })
        return unsubscribe;
    }, [])


    const goBack = () => {
        props.navigation.goBack();
    }

    const navigateToForgotPassword = () => {
        props.navigation.navigate("ForgotPassword");
    }


    const handleLogIn = () => {

        //TO-DO check email and password states (empty, not valid)

        setLoading(true);

        if (email.length == 0){
            alert("E-mail boş olamaz.");
            setLoading(false);
            return;
        }
        else if (password.length == 0){
            alert("Şifre boş olamaz.");
            setLoading(false);
            return;
        }

        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials  => {
                //store User
                const user = userCredentials.user;

            })
            .catch(error => {
                const errorCode = error.code;

                if (errorCode.includes("user-not-found")){
                    alert("Kullanıcı bulunamadı.");
                }

                else if (errorCode.includes("invalid-email")){
                    alert("Hatalı e-mail formatı girdiniz.");
                }
                else if (errorCode.includes("wrong-password")){
                    alert("Şifreyi yanlış girdiniz.");
                }

                setLoading(false);
            })
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000000"></ActivityIndicator>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={styles.screenHeaderWithLogo}>Giriş Yap</Text>
            <TextInput style={styles.inputFirst} value={email} onChangeText={setEmail} placeholder='E-mail'>
            </TextInput>
            <TextInput style={styles.inputs} secureTextEntry value={password} onChangeText={setPassword} placeholder='Şifre'>
            </TextInput>
            <Text style={styles.forgotPasswordText} onPress={navigateToForgotPassword}>Şifremi unuttum</Text>
            <TouchableOpacity onPress={handleLogIn} style={styles.signinButton}>
                <Text style={styles.buttonText}>GİRİŞ YAP</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SignInScreen;