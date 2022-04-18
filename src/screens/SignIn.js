import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, TouchableOpacity, Text, TextInput, ActivityIndicator,Alert } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth } from '../../Firebase/firebase';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useTheme } from '@react-navigation/native';

const SignInScreen = (props) => {
    
    const theme = useTheme();
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
            Alert.alert("Hata","E-mail boş olamaz.");
            setLoading(false);
            return;
        }
        else if (password.length == 0){
            Alert.alert("Hata","Şifre boş olamaz.");
            setLoading(false);
            return;
        }

        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {

                const user = userCredentials.user;
                const userData = {user, password};
                EncryptedStorage.setItem("USER_CREDENTIALS", JSON.stringify(userData));
            })
            .catch(error => {
                const errorCode = error.code;

                if (errorCode.includes("user-not-found")){
                    Alert.alert("Hata","Kullanıcı bulunamadı.");
                }

                else if (errorCode.includes("invalid-email")){
                    Alert.alert("Hata","Hatalı e-mail formatı girdiniz.");
                }
                else if (errorCode.includes("wrong-password")){
                    Alert.alert("Hata","Şifreyi yanlış girdiniz.");
                }

                setLoading(false);
            })
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                <AntDesign
                    color={theme.colors.text}
                    name={"back"}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={{...styles.screenHeaderWithLogo, color: theme.colors.text}}>Giriş Yap</Text>
            <TextInput style={{...styles.inputFirst,color: theme.colors.text, borderColor: theme.colors.border}} value={email} onChangeText={setEmail} placeholder='E-mail'>
            </TextInput>
            <TextInput style={{...styles.inputs,color: theme.colors.text, borderColor: theme.colors.border}} secureTextEntry value={password} onChangeText={setPassword} placeholder='Şifre'>
            </TextInput>
            <Text style={{...styles.forgotPasswordText, color: theme.colors.text}} onPress={navigateToForgotPassword}>Şifremi unuttum</Text>
            <TouchableOpacity onPress={handleLogIn} style={styles.signinButton}>
                <Text style={styles.buttonText}>GİRİŞ YAP</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SignInScreen;