
import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, PixelRatio} from 'react-native';



const styles = StyleSheet.create({
    inputFirst: {
       margin: 15,
       height: 52,
       borderColor: '#000000',
       borderWidth: 2,
       marginTop: 177 / PixelRatio.get()
    },
    inputs: {
        margin: 15,
        height: 52,
        borderColor: '#000000',
        borderWidth: 2,
        marginTop: 16 / PixelRatio.get()
     },
})

const RegisterScreen = () => {

    return(
        <SafeAreaView>
            <TextInput style = {styles.inputFirst} placeholder='Ad'>
            </TextInput>
            <TextInput style = {styles.inputs}>
            </TextInput>
            <TextInput style = {styles.inputs}>
            </TextInput>
            <TextInput style = {styles.inputs}>
            </TextInput>
            <TextInput style = {styles.inputs}>
            </TextInput>
            <TextInput style = {styles.inputs}>
            </TextInput>
        </SafeAreaView>
    );
}

export default RegisterScreen;