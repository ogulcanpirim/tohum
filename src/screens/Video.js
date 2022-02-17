import React from 'react'
import { SafeAreaView, TextInput, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import VideoComponent from '../components/VideoComponent';
import { data } from '../data/video_dummy';
import SearchBarComponent from '../components/SearchBarComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const VideoScreen = (props) => {

    const goToUploadVideo = () => {
        props.navigation.navigate("UploadVideo");
    }

    const goToUserVideo = () => {
        props.navigation.navigate("UserVideos");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.screenHeader}>İzle</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.addFormButton} onPress={goToUserVideo}>
                        <MaterialIcons
                            name={"video-collection"}
                            size={30}>
                        </MaterialIcons>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addFormButton} onPress={goToUploadVideo}>
                        <FontAwesome5
                            name={"plus-circle"}
                            size={30}>
                        </FontAwesome5>
                    </TouchableOpacity>
                </View>
            </View>
            <SearchBarComponent />
            <ScrollView style={styles.listViewStyle}>
                {data.map((video) => {

                    return (
                        <VideoComponent
                            key={video.id}
                            name={video.videoName}
                            publisher={video.videoPublisher}
                            length={video.videoLength}
                            uri={video.videoUri}
                            goVideo={() => props.navigation.navigate("VideoComponent", { ...video })}
                        />
                    );
                })}
            </ScrollView>


        </SafeAreaView>
    );

}

export default VideoScreen;