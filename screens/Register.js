
import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';



const styles = StyleSheet.create({

    textStyle: {
        fontSize: 36,
        fontFamily: 'Comfortaa-Regular',
        marginTop: 107,
        marginLeft: 15,
        marginBottom: 33,
    },

    accountInfoText: {
        margin: 15,
    },

    inputFirst: {
       marginLeft: 15,
       marginRight: 15,
       height: 52,
       borderColor: '#000000',
       borderWidth: 2,
    },
    inputs: {
        marginLeft: 15,
        marginRight: 15,
        height: 52,
        borderColor: '#000000',
        borderWidth: 2,
        marginTop: 16
     },
     registerButton: {
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#39be37',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 16,
     },
     registerButtonText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
     }
})

const RegisterScreen = () => {

    return(
        <SafeAreaView>
            <Text style = {styles.textStyle}>Hesap Oluştur</Text>
            <TextInput style = {styles.inputFirst} placeholder='Ad'>
            </TextInput>
            <TextInput style = {styles.inputs} placeholder='Soyad'>
            </TextInput>
            <TextInput style = {styles.inputs} placeholder='Kullanıcı Adı'>
            </TextInput>
            <TextInput style = {styles.inputs} placeholder='E-mail'>
            </TextInput>
            <TextInput style = {styles.inputs} placeholder='Şifre'>
            </TextInput>
            <TextInput style = {styles.inputs} placeholder='Şifre'>
            </TextInput>
            <Text style={styles.accountInfoText}>Hesap oluşturarak, Kullanıcı Sözleşmesini ve Gizlilik Sözleşmesini kabul etmiş olursunuz.</Text>
            <TouchableOpacity style = {styles.registerButton}>
                <Text style = {styles.registerButtonText}>OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default RegisterScreen;