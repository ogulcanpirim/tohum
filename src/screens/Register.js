
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { firebase } from '../Firebase/firebase';
import styles from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign';

const RegisterScreen = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goBack = () => {
        props.navigation.goBack();
    }
    function createUser() {
        //firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{

        //})
    }
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={goBack}>
                <AntDesign
                    name={"back"}
                    size={32}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={styles.textStyle}>Hesap Oluştur</Text>
            <TextInput style={styles.inputFirst} value={name} onChangeText={setName} placeholder={'Ad'}>
            </TextInput>
            <TextInput style={styles.inputs} value={surname} onChangeText={setSurname} placeholder='Soyad'>
            </TextInput>
            <TextInput style={styles.inputs} value={username} onChangeText={setUsername} placeholder='Kullanıcı Adı'>
            </TextInput>
            <TextInput style={styles.inputs} value={email} onChangeText={setEmail} placeholder='E-mail'>
            </TextInput>
            <TextInput style={styles.inputs} value={password} onChangeText={setPassword} placeholder='Şifre'>
            </TextInput>
            <TextInput style={styles.inputs} placeholder='Şifre'>
            </TextInput>
            <Text style={styles.accountInfoText}>Hesap oluşturarak, Kullanıcı Sözleşmesini ve Gizlilik Sözleşmesini kabul etmiş olursunuz.</Text>
            <TouchableOpacity onPress={createUser} style={styles.registerButton}>
                <Text style={styles.registerButtonText}>OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default RegisterScreen;