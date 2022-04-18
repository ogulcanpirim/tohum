
import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, ActivityIndicator ,Alert} from 'react-native';
import { auth, db } from '../../Firebase/firebase';
import styles from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';

const RegisterScreen = (props) => {

    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

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

    const navigateUserAgreement = () => {
        //TODO
        props.navigation.goBack();
    }

    const navigatePolicyAgreement = () => {
        //TODO
        props.navigation.goBack();
    }

    function handleRegister() {
        setLoading(true);

        if (name.length == 0) {
            Alert.alert("Hata", "Ad alanı boş olamaz.");
            setLoading(false);
            return;
        }

        else if (surname.length == 0) {
            Alert.alert("Hata","Soyad alanı boş olamaz.");
            setLoading(false);
            return;
        }

        else if (username.length == 0) {
            Alert.alert("Hata","Kullanıcı adı alanı boş olamaz.");
            setLoading(false);
            return;
        }

        else if (email.length == 0) {
            Alert.alert("Hata","E-mail alanı boş olamaz.");
            setLoading(false);
            return;
        }

        else if (password.length == 0) {
            Alert.alert("Hata","Şifre alanı boş olamaz.");
            setLoading(false);
            return;
        }

        else if (password !== secondPassword) {
            Alert.alert("Hata","Girilen şifreler uyuşmuyor.");
            setLoading(false);
            return;
        }

        else if (password.length < 6) {
            Alert.alert("Hata","Şifre en az 6 karakter olmalıdır.")
            setLoading(false);
            return;
        }

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                user.updateProfile({ displayName: username });
                storeUser(user);
            })
            .catch(error => {
                const errorCode = error.code;

                if (errorCode.includes("invalid-email")) {
                    Alert.alert("Hata","Hatalı e-mail formatı girdiniz.");
                }
                else if (errorCode.includes("email-already-in-use")){
                    Alert.alert("Hata","Bu email adresi kullanılmaktadır.")
                }
                
                setLoading(false);
            })
    }

    const storeUser = async(user) => {
        await db.collection("users").doc(user.uid).set({name: name, surname: surname});
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
            <View>
                <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                    <AntDesign
                        color={theme.colors.text}
                        name={"back"}
                        size={35}>
                    </AntDesign>
                </TouchableOpacity>
            </View>
            <Text style={{...styles.screenHeaderWithLogo, color: theme.colors.text}}>Hesap Oluştur</Text>
            <TextInput style={{...styles.inputFirst, color: theme.colors.text, borderColor: theme.colors.border}} value={name} onChangeText={setName} placeholder={'Ad'}>
            </TextInput>
            <TextInput style={{...styles.inputs, color: theme.colors.text, borderColor: theme.colors.border}} value={surname} onChangeText={setSurname} placeholder='Soyad'>
            </TextInput>
            <TextInput style={{...styles.inputs, color: theme.colors.text, borderColor: theme.colors.border}} value={username} onChangeText={setUsername} placeholder='Kullanıcı Adı'>
            </TextInput>
            <TextInput style={{...styles.inputs, color: theme.colors.text, borderColor: theme.colors.border}} value={email} onChangeText={setEmail} placeholder='E-mail'>
            </TextInput>
            <TextInput style={{...styles.inputs, color: theme.colors.text, borderColor: theme.colors.border}} secureTextEntry value={password} onChangeText={setPassword} placeholder='Şifre'>
            </TextInput>
            <TextInput style={{...styles.inputs, color: theme.colors.text, borderColor: theme.colors.border}} secureTextEntry value={secondPassword} onChangeText={setSecondPassword} placeholder='Şifre'>
            </TextInput>
            <Text style={{...styles.accountInfoText, color: theme.colors.text}}>Hesap oluşturarak,                 
                <Text onPress={navigateUserAgreement} style={{...styles.agreementText, color: theme.colors.text}}>Kullanıcı Sözleşmesini</Text>
                <Text style={{color: theme.colors.text}}> ve </Text>
                <Text onPress={navigatePolicyAgreement} style={{...styles.agreementText, color: theme.colors.text}}>Gizlilik Sözleşmesini</Text>
                <Text style={{color: theme.colors.text}}> kabul etmiş olursunuz. </Text>
            </Text>
            <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                <Text style={styles.buttonText}>OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default RegisterScreen;