import React from 'react';
import styles from '../screens/styles';
import { SafeAreaView, TouchableOpacity, Text, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChangePasswordScreen = (props) => {

    const goBack = () => {
        props.navigation.goBack();
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
            <TextInput style={styles.inputFirst} placeholder='Eski Şifre'>
            </TextInput>
            <TextInput style={styles.inputs} placeholder='Şifre'>
            </TextInput>
            <TextInput style={styles.inputs} placeholder='Şifre'>
            </TextInput>
            <TouchableOpacity style={styles.signinButton}>
                <Text style={styles.buttonText}>DEĞİŞTİR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default ChangePasswordScreen;