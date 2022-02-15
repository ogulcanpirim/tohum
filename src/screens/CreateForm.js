import React,{useState} from 'react';
import styles from '../screens/styles';
import { SafeAreaView, TouchableOpacity, Text, TextInput, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CreateFormScreen = (props) => {

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const goBack = () => {
        props.navigation.goBack();
    }

    const createForm = () => {
        if (title.length < 5){
            Alert.alert("Hata", "Video ismi en az 5 karakter olmalıdır!")
        }
        else if (!message){
            Alert.alert("Hata", "Forum mesajı boş olamaz!");
        }
        else {
            //TODO: check whether given entry exists with the same form name
            //TODO: create new document in firebase/forums.
            Alert.alert("Success", "Forum başarıyla oluşturuldu.");
        }
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
            <TextInput value={title} onChangeText={setTitle} style={styles.inputFirst} placeholder='Forum Başlığı'>
            </TextInput>
            <TextInput value={message} onChangeText={setMessage} style={styles.createFormInput} placeholder='Forum için ilk mesajı yazın...' multiline={true}>
            </TextInput>
            
            <TouchableOpacity style={styles.createFormButton} onPress={createForm}>
                <Text style={styles.buttonText}>OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default CreateFormScreen;