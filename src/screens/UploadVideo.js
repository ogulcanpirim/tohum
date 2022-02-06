import React from 'react';
import styles from '../screens/styles';
import { SafeAreaView, TouchableOpacity, Text, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const UploadVideoScreen = (props) => {

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
            <Text style={styles.screenHeaderWithLogo}>Video Yükle</Text>
            <TextInput style={styles.inputFirst} placeholder='Video Başlığı'/>
            <TextInput style={styles.createFormInput} placeholder='Video açıklaması yazın...' multiline={true}/>
            <TouchableOpacity>
                <Text>Bir video seçin.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadVideoButton}>
                <FontAwesome5
                    style={{padding: 10}}
                    name={"video"}
                    color={"#fff"}
                    size={15}>
                </FontAwesome5>
                <Text style={styles.buttonText}>YÜKLE</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default UploadVideoScreen;