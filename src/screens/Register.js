
import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth, db } from '../../Firebase/firebase';
import styles from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LogoComponent from '../components/LogoComponent';
import { doc } from 'firebase/firestore';

const RegisterScreen = (props) => {

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
            alert("Ad alanı boş olamaz.");
            setLoading(false);
            return;
        }

        else if (surname.length == 0) {
            alert("Soyad alanı boş olamaz.");
            setLoading(false);
            return;
        }

        else if (username.length == 0) {
            alert("Kullanıcı adı alanı boş olamaz.");
            setLoading(false);
            return;
        }

        else if (email.length == 0) {
            alert("E-mail alanı boş olamaz.");
            setLoading(false);
            return;
        }

        else if (password.length == 0) {
            alert("Şifre alanı boş olamaz.");
            setLoading(false);
            return;
        }

        else if (password !== secondPassword) {
            alert("Girilen şifreler uyuşmuyor.");
            setLoading(false);
            return;
        }

        else if (password.length < 6) {
            alert("Şifre en az 6 karakter olmalıdır.")
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
                    alert("Hatalı e-mail formatı girdiniz.");
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
                <ActivityIndicator size="large" color="#000000"></ActivityIndicator>
            </View>
        );
    }


    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                    <AntDesign
                        name={"back"}
                        size={35}>
                    </AntDesign>
                </TouchableOpacity>
            </View>
            <Text style={styles.screenHeaderWithLogo}>Hesap Oluştur</Text>
            <TextInput style={styles.inputFirst} value={name} onChangeText={setName} placeholder={'Ad'}>
            </TextInput>
            <TextInput style={styles.inputs} value={surname} onChangeText={setSurname} placeholder='Soyad'>
            </TextInput>
            <TextInput style={styles.inputs} value={username} onChangeText={setUsername} placeholder='Kullanıcı Adı'>
            </TextInput>
            <TextInput style={styles.inputs} value={email} onChangeText={setEmail} placeholder='E-mail'>
            </TextInput>
            <TextInput style={styles.inputs} secureTextEntry value={password} onChangeText={setPassword} placeholder='Şifre'>
            </TextInput>
            <TextInput style={styles.inputs} secureTextEntry value={secondPassword} onChangeText={setSecondPassword} placeholder='Şifre'>
            </TextInput>
            <Text style={styles.accountInfoText}>Hesap oluşturarak,                 
                <Text onPress={navigateUserAgreement} style={styles.agreementText}>Kullanıcı Sözleşmesini</Text>
                <Text> ve </Text>
                <Text onPress={navigatePolicyAgreement} style={styles.agreementText}>Gizlilik Sözleşmesini</Text>
                <Text> kabul etmiş olursunuz.</Text>
            </Text>
            <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                <Text style={styles.buttonText}>OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default RegisterScreen;