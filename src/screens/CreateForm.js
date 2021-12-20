import React from 'react';
import styles from '../screens/styles';
import { SafeAreaView, TouchableOpacity, Text, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CreateFormScreen = (props) => {

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
            <Text style={styles.screenHeaderWithLogo}>Forum Oluştur</Text>
            <TextInput style={styles.inputFirst} placeholder='Forum Başlığı'>
            </TextInput>
            <TextInput style={styles.createFormInput} placeholder='Forum için ilk mesajı yazın...' multiline={true}>
            </TextInput>
            
            <TouchableOpacity style={styles.createFormButton}>
                <Text style={styles.buttonText}>OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default CreateFormScreen;