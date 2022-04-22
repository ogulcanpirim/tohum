import React, { useState } from "react";
import { View, ActivityIndicator, Alert, TouchableOpacity, Text, SafeAreaView, TextInput } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from "./styles";
import { useTheme } from '@react-navigation/native';
import ImageSelector from "../components/ImageSelector";
import { db, auth } from "../../Firebase/firebase";
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';

const CreateRentScreen = (props) => {

    const theme = useTheme();
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState('');
    const storage = getStorage();

    const goBack = () => {
        props.navigation.goBack();
    }

    const uriToBlob = async (uri) => {
        setLoading(true);
        const blob = await new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                // return the blob
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                // something went wrong
                reject(new Error('uriToBlob failed'));
            };

            // this helps us get a blob
            xhr.responseType = 'blob';

            xhr.open('GET', uri, true);
            xhr.send(null);

        });

        return blob;

    }

    const uploadPhotos = async (blob, fileName, docId) => {
        const fileRef = ref(storage, auth.currentUser?.uid + '/rents/' + docId + '/' + fileName);
        await uploadBytes(fileRef, blob);
        const photoURL = await getDownloadURL(fileRef);
        return photoURL;
    }

    const createRent = async () => {

        if (title.length < 10) {
            Alert.alert("Hata", "İlan Başlığı en az 10 karakter olmalı!");
            return;
        }
        if (description.length === 0) {
            Alert.alert("Hata", "İlan açıklaması boş olamaz");
            return;
        }

        if (items.length < 3) {
            Alert.alert("Hata", "İlan fotoğraf sayısı 3 ile 10 arasında olmalı!");
            return;
        }

        if (price.length === 0) {
            Alert.alert("Hata", "İlan fiyatı boş olamaz");
            return;
        }

        if (price.match(/^[0-9]*$/) === null) {
            Alert.alert("Hata", "İlan fiyatı sayı olmalı!");
            return;
        }
        //upload to firebase
        setLoading(true);
        const docRef = db.collection("rents").doc();
        const docId = docRef.id;
        const images = [];
        const blobPromises = items.map(async (item) => {
            const blob = await uriToBlob(item.uri);
            const fileName = item.name;
            const photoURL = await uploadPhotos(blob, fileName, docId);
            images.push(photoURL);
        });
        await Promise.all(blobPromises);            
        await docRef.set({ title: title, description: description, price: price, user: auth.currentUser?.uid , images: images });
        Alert.alert("Success", '"' + title + '"' + " başlıklı ilan başarıyla oluşturuldu.");
        clearFields();
        setLoading(false);
    }

    const clearFields = () => {
        setTitle("");
        setPrice("");
        setDescription("");
        setItems([]);
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
            <Text style={{ ...styles.screenHeaderWithLogo, color: theme.colors.text }}>Kiralık Ver</Text>
            <TextInput placeholderTextColor={theme.colors.border} value={title} onChangeText={setTitle} style={{ ...styles.inputFirst, borderColor: theme.colors.border, color: theme.colors.text }} placeholder='İlan Başlığı' />
            <TextInput placeholderTextColor={theme.colors.border} value={description} onChangeText={setDescription} style={{ ...styles.createFormInput, borderColor: theme.colors.border, color: theme.colors.text }} placeholder='İlan açıklaması yazın...' multiline={true} />
            <ImageSelector items={items} setItems={setItems} theme={theme} />
            <TextInput placeholderTextColor={theme.colors.border} value={price} onChangeText={setPrice} style={{ ...styles.inputs, borderColor: theme.colors.border, color: theme.colors.text }} placeholder='Fiyat belirleyin' />
            <TouchableOpacity style={styles.uploadVideoButton} disabled={loading} onPress={createRent}>
                <Text style={styles.buttonText}>OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


export default CreateRentScreen;