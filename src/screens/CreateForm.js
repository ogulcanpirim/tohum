import React, { useDebugValue, useState } from 'react';
import styles from '../screens/styles';
import { View, SafeAreaView, TouchableOpacity, Text, TextInput, Alert, ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth, db } from '../../Firebase/firebase';

const CreateFormScreen = (props) => {

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const goBack = () => {
        props.navigation.goBack();
    }

    const createForm = async () => {
        setLoading(true);
        if (title.length < 5) {
            Alert.alert("Hata", "Forum başlığı en az 5 karakter olmalıdır!")
        }
        else if (!message) {
            Alert.alert("Hata", "Forum mesajı boş olamaz!");
        }
        else {
            const docRef = db.collection("forms").doc();
            await docRef.set({ createdUser: auth.currentUser?.uid, formTitle: title, createdAt: new Date()})
            await docRef.collection("messages").add({messages: [message]})
            Alert.alert("Success", '"' + title + '"' + " başlıklı forum başarıyla oluşturuldu.");
            //clear fields
            setTitle("");
            setMessage("");
        }
        setLoading(false);
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
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

            <TouchableOpacity disabled={loading} style={styles.createFormButton} onPress={createForm}>
                <Text style={styles.buttonText}>OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default CreateFormScreen;