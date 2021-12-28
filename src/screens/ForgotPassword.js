import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, TouchableOpacity, TextInput , View, ActivityIndicator} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth } from '../../Firebase/firebase';

const ForgotPasswordScreen = (props) => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user){

            }
        })
        return unsubscribe;
    }, [])


    const goBack = () => {
        props.navigation.goBack();
    }

    const handleForgotPassword = () => {

        setLoading(!loading);

        if (email.length == 0) {
            alert("E-mail alanı boş olamaz.");
            setLoading(false);
            return;
        }

        auth.
            sendPasswordResetEmail(email).then(() => {
                alert("Sıfırlama linki e-mail adresinize gönderildi.");
                setLoading(!loading);
                goBack();
            }).catch(error => {
                const errorCode = error.code;

                if (errorCode.includes("invalid-email")) {
                    alert("Hatalı e-mail formatı girdiniz.");
                }
                else if (errorCode.includes("user-not-found")) {
                    alert("E-mail ile kullanıcı bulunamadı.");
                }
            })
        
        setLoading(!loading);
        

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
                    name={"back"}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={styles.screenHeaderWithLogo}>Şifremi unuttum</Text>
            <TextInput style={styles.inputFirst} value={email} onChangeText={setEmail} placeholder='E-mail' />
            <TouchableOpacity style={styles.signinButton} onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>E-MAIL GONDER</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

}

export default ForgotPasswordScreen;