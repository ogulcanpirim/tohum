import React from 'react'
import { SafeAreaView, TouchableOpacity, Text , TextInput} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SignInScreen = (props) => {

    const goBack = () => {
        props.navigation.goBack();
    }

    const logIn = () => {
        props.navigation.navigate("AppScreens");
    }
    
    return (
        <SafeAreaView>
            <TouchableOpacity style = {styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={styles.screenHeaderWithLogo}>Giriş Yap</Text>
            <TextInput style={styles.inputFirst}  placeholder={'E-mail'}>
            </TextInput>
            <TextInput style={styles.inputs} placeholder='Şifre'>
            </TextInput>
            <TouchableOpacity onPress={logIn} style={styles.signinButton}>
                <Text style={styles.buttonText}>GİRİŞ YAP</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SignInScreen;