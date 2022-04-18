import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, ActivityIndicator, Dimensions, Text, StyleSheet, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { auth } from '../../Firebase/firebase';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    touchOutside: {
        flex: 1,
    },

    modalContainer: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: '15%',
        marginTop: 15,
        left: 15,
        right: 15,
        borderRadius: 10,
        height: Dimensions.get("window").height / 7.5,
        borderWidth: 1,

    },
    galleryContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    photoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

const ProfilePictureComponent = (props) => {


    const storage = getStorage();
    const [loading, setLoading] = useState(false);
    const { theme } = props;

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

        await uploadToFirebase(blob);

    }

    uploadToFirebase = async (blob) => {
        const fileRef = ref(storage, auth.currentUser?.uid + '/profile.png');
        await uploadBytes(fileRef, blob);
        const photoURL = await getDownloadURL(fileRef);
        await auth.currentUser.updateProfile({ photoURL });
        setLoading(false);
    }

    const camera = () => {
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: Dimensions.get('window').height,
                maxWidth: Dimensions.get('window').width,
            },
            async (response) => {
                if (!response.hasOwnProperty("didCancel")) {
                    await uriToBlob(response.assets[0].uri)
                    setModalVisible(false);
                    console.log("response: " + JSON.stringify(response));
                }
            },
        );
    }

    const gallery = () => {
        launchImageLibrary(
            {
                mediaType: 'photo', //mixed for both
                includeBase64: false,
                maxHeight: Dimensions.get('window').height,
                maxWidth: Dimensions.get('window').width,
                quality: 1,
                //selection limit 10
            },
            async (response) => {
                if (!response.hasOwnProperty("didCancel")) {
                    await uriToBlob(response.assets[0].uri)
                    setModalVisible(false);
                    Alert.alert("Mesaj", "KİRALADINIZ");
                }
            },
        )
    }

    const { modalVisible, setModalVisible } = props;

    const LoadingScreen = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#26931e"></ActivityIndicator>
            </View>
        );
    }

    const ModalComponent = () => {
        const textColor = theme.colors.text;
        return (
            <TouchableOpacity style={styles.touchOutside} onPress={() => setModalVisible(false)}>
                <View style={{...styles.modalContainer, borderColor: theme.colors.border}} onPress={(() => setModalVisible(false))}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={gallery}>
                        <View style={{...styles.galleryContainer, borderColor: theme.colors.border}}>
                            <FontAwesome5
                                name={"photo-video"}
                                size={30}
                                color={textColor}
                                style={{ marginLeft: 15 }}
                            >
                            </FontAwesome5>
                            <Text style={{ position: 'absolute', left: '20%', color: textColor }}>Galeri</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }} onPress={camera}>
                        <View style={styles.photoContainer}>
                            <FontAwesome5
                                name={"camera"}
                                color={textColor}
                                size={30}
                                style={{ marginLeft: 15 }}
                            >
                            </FontAwesome5>
                            <Text style={{ position: 'absolute', left: '20%', color: textColor }}>Fotoğraf çek</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {loading ? <LoadingScreen /> : <ModalComponent />}
            </Modal>
        </View>
    );
}


export default ProfilePictureComponent