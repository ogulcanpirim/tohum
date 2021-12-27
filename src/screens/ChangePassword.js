import React, { useState, useEffect } from 'react';
import styles from '../screens/styles';
import { SafeAreaView, TouchableOpacity, Text, TextInput, ActivityIndicator, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth, firebaseAuth } from '../../Firebase/firebase';
import { reauthenticateWithCredential } from 'firebase/auth';


const ChangePasswordScreen = (props) => {

    const [OldPassword, setOldPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [SecondPassword, setSecondPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const goBack = () => {
        props.navigation.goBack();
    }


    const changePassword = () => {

        setLoading(true);

        if (OldPassword.length == 0) {
            alert("Eski şifre boş olamaz.");
            setLoading(false);
            return;
        }
        else if (NewPassword.length == 0) {
            alert("Yen şifre boş olamaz.");
            setLoading(false);
            return;
        }
        else if (NewPassword !== SecondPassword) {
            alert("Girilen yeni şifre uyuşmuyor.");
            setLoading(false);
            return;
        }
        else if (NewPassword.length < 6){
            alert("Şifre en az 6 karakter olmalıdır.")
            setLoading(false);
            return;
        }


        const user = auth.currentUser;
        const credential = firebaseAuth.EmailAuthProvider.credential(user.email, OldPassword);
        //Reauthenticate user

        reauthenticateWithCredential(user, credential).then(() => {

            //reauthenticate succesfull
            const currentUser = auth.currentUser;
            currentUser.updatePassword(NewPassword).then(() => {
                alert("Şifre değiştirildi.")
                setLoading(false);
                props.navigation.navigate("Profil");
                goBack();
            })
            }).catch((error) => {
                const errorCode = error.code;
                setLoading(false);
                if (errorCode.includes("wrong-password")) {
                    alert("Şifreyi yanlış girdiniz.");
                }
        });

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
            <Text style={styles.screenHeaderWithLogo}>Şifreni Değiştir</Text>
            <TextInput style={styles.inputFirst} secureTextEntry value={OldPassword} onChangeText={setOldPassword} placeholder='Eski Şifre'>
            </TextInput>
            <TextInput style={styles.inputs} secureTextEntry value={NewPassword} onChangeText={setNewPassword} placeholder='Şifre'>
            </TextInput>
            <TextInput style={styles.inputs} secureTextEntry value={SecondPassword} onChangeText={setSecondPassword} placeholder='Şifre'>
            </TextInput>
            <TouchableOpacity style={styles.signinButton} onPress={changePassword}>
                <Text style={styles.buttonText}>DEĞİŞTİR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default ChangePasswordScreen;