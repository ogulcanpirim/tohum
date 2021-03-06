import React, { useDebugValue, useState } from 'react';
import styles from '../screens/styles';
import { View, SafeAreaView, TouchableOpacity, Text, TextInput, Alert, ActivityIndicator} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth, db } from '../../Firebase/firebase';
import { useTheme } from '@react-navigation/native';

const CreateFormScreen = (props) => {

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const goBack = () => {
        props.navigation.goBack();
    }

    const getUserName = async () => {
        const res = await db.collection("users").doc(auth.currentUser?.uid).get();
        const data = res.data();
        return data.name + " " + data.surname;
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
            await docRef.set({ createdUser: auth.currentUser?.uid, formTitle: title, createdAt: new Date(), users: [auth.currentUser?.uid]})
            const firstMessage = {
                createdAt: new Date(),
                text: message,
                user: {
                    _id: auth.currentUser?.uid,
                    name: await getUserName(auth.currentUser?.uid),
                    avatar: auth.currentUser?.photoURL
                }
            };
            await docRef.collection("messages").add(firstMessage);
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
                    color={theme.colors.text}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={{...styles.screenHeaderWithLogo, color: theme.colors.text}}>Forum Oluştur</Text>
            <TextInput value={title} onChangeText={setTitle} style={{...styles.inputFirst, borderColor: theme.colors.border, color: theme.colors.text}} placeholder='Forum Başlığı'>
            </TextInput>
            <TextInput value={message} onChangeText={setMessage} style={{...styles.createFormInput, borderColor: theme.colors.border, color: theme.colors.text}} placeholder='Forum için ilk mesajı yazın...' multiline={true}>
            </TextInput>

            <TouchableOpacity disabled={loading} style={styles.createFormButton} onPress={createForm}>
                <Text style={styles.buttonText}>OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default CreateFormScreen;