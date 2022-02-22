import React, { useState } from 'react';
import styles from '../screens/styles';
import { View, SafeAreaView, Dimensions, TouchableOpacity, Text, TextInput, Alert, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchImageLibrary } from 'react-native-image-picker';
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { auth } from '../../Firebase/firebase';
import * as Progress from 'react-native-progress'
import { createThumbnail } from "react-native-create-thumbnail";

const UploadVideoScreen = (props) => {

    const storage = getStorage();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState("0");
    const [videoBlob, setVideoBlob] = useState(undefined);
    const [thumbnail, setThumbnail] = useState(undefined);
    const [loading, setLoading] = useState(false);


    const uriToBlob = async (uri) => {
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

        createThumbnail({
            url: uri,
            timeStamp: 10000,
        })
            .then(response => setThumbnail(response.path))
            .catch(err => console.log({ err }));

        setVideoBlob(blob);

    }

    const uploadVideoFirebase = () => {

        setLoading(true);
        if (title.length < 5) {
            Alert.alert("Hata", "Video ismi en az 5 karakter olmalıdır!")
            setLoading(false);
        }
        else if (!description.length) {
            Alert.alert("Hata", "Video açıklaması boş olamaz!");
            setLoading(false);
        }
        else {
            const metadata = {
                customMetadata: {
                    'description': description
                }
            };
            console.log("metadata: " + JSON.stringify(metadata));

            const fileRef = ref(storage, auth.currentUser?.uid + '/videos/' + title + '.mp4');

            const uploadTask = uploadBytesResumable(fileRef, videoBlob, metadata);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                (error) => {
                    console.log("error: " + error);
                    Alert.alert("Hata", "Video yüklenirken bir sorun oluştu");
                },
                () => {
                    setLoading(false);
                    /*
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                    */
                    Alert.alert("Mesaj", "Yükleme tamamlandı!");
                    goBack();
                }
            );
        }
    }


    const goBack = () => {
        props.navigation.goBack();
    }

    const gallery = () => {
        launchImageLibrary(
            {
                mediaType: 'video',
                includeBase64: false,
                maxHeight: Dimensions.get('window').height,
                maxWidth: Dimensions.get('window').width,
                quality: 1,
            },
            async (response) => {
                if (!response.hasOwnProperty("didCancel")) {
                    await uriToBlob(response.assets[0].uri);
                }
            },
        )
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
            <TextInput value={title} onChangeText={setTitle} style={styles.inputFirst} placeholder='Video Başlığı' />
            <TextInput value={description} onChangeText={setDescription} style={styles.createFormInput} placeholder='Video açıklaması yazın...' multiline={true} />
            <TouchableOpacity onPress={gallery}>
                <View style={styles.uploadContainer}>
                    <View style={styles.uploadDivider}>
                        {thumbnail ?
                            <Image source={{ uri: thumbnail }} style={{ flex: 1 }} /> :
                            <FontAwesome5 style={styles.uploadIcon} name={"upload"} color={"#000"} size={20} />
                        }
                    </View>
                    {loading ?
                        <Progress.Bar style={{position: 'absolute', left: '25%', width: '60%'}} progress={parseFloat(progress)} color={"#000"}/> :
                        <Text style={styles.uploadText}>{thumbnail ? "Seçilen video yüklemeye hazır." : "Bir video seçmek için dokunun."}</Text>
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity disabled={loading} style={styles.uploadVideoButton} onPress={uploadVideoFirebase}>
                <FontAwesome5
                    style={{ marginRight: 10 }}
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