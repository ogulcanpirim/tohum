
import React, {useState} from 'react'
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import {firebase} from '../Firebase/firebase';
import styles from './styles'

const RegisterScreen = () => {
    const [name, setName] = useState('salam');

    return(
        <SafeAreaView>
            <Text style = {styles.textStyle}>Hesap Oluştur</Text>
            <TextInput style={styles.inputFirst} value={name} onChangeText={setName} placeholder={'Ad'}>
            </TextInput>
            <TextInput style={styles.inputs} placeholder='Soyad'>
            </TextInput>
            <TextInput style={styles.inputs} placeholder='Kullanıcı Adı'>
            </TextInput>
            <TextInput style={styles.inputs} placeholder='E-mail'>
            </TextInput>
            <TextInput style={styles.inputs} placeholder='Şifre'>
            </TextInput>
            <TextInput style={styles.inputs} placeholder='Şifre'>
            </TextInput>
            <Text style={styles.accountInfoText}>Hesap oluşturarak, Kullanıcı Sözleşmesini ve Gizlilik Sözleşmesini kabul etmiş olursunuz.</Text>
            <TouchableOpacity style = {styles.registerButton}>
                <Text style = {styles.registerButtonText}>OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default RegisterScreen;