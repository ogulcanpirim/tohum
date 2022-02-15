import React,{useState} from 'react';
import styles from '../screens/styles';
import { View, SafeAreaView, Dimensions, TouchableOpacity, Text, TextInput, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { launchImageLibrary } from 'react-native-image-picker';

const UploadVideoScreen = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(undefined);

    const uploadVideoFirebase = () => {

        if (title.length < 5){
            Alert.alert("Hata", "Video ismi en az 5 karakter olmalıdır!")
        }
        else if (!description.length){
            Alert.alert("Hata", "Video açıklaması boş olamaz!");
        }
        else if (!video){
            Alert.alert("Hata", "Lütfen yüklemek için bir video seçin");
        }
        else{
            //todo upload video
            Alert.alert("Hata", "Lütfen yüklemek için bir video seçin");
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
                    setLoading(true);
                    await uriToBlob(response.assets[0].uri)
                    setLoading(false);
                    alert("Profil fotoğrafı güncellendi");
                    setModalVisible(false);
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
                        <FontAwesome5
                            style={styles.uploadIcon}
                            name={"upload"}
                            color={"#000"}
                            size={20}>
                        </FontAwesome5>
                    </View>
                    <Text style={styles.uploadText}>Bir video yüklemek için dokunun.</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadVideoButton} onPress={uploadVideoFirebase}>
                <FontAwesome5
                    style={{marginRight: 10}}
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