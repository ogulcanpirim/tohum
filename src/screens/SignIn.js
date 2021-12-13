import React from 'react'
import { SafeAreaView, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SignInScreen = (props) => {

    const goBack = () => {
        props.navigation.goBack();
    }
    
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={goBack}>
                <AntDesign
                    name={"back"}
                    size={32}>
                </AntDesign>
            </TouchableOpacity>
                <Text style={styles.textStyle}>GİRİŞ YAP</Text>
        </SafeAreaView>
    )
}

export default SignInScreen;