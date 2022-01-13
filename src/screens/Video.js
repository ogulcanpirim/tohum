import React from 'react'
import { SafeAreaView, TextInput, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import VideoComponent from '../components/VideoComponent';
import { data } from '../data/video_dummy';
import SearchBarComponent from '../components/SearchBarComponent';




const VideoScreen = (props) => {

    const createVideo = () => {
        //props.navigation();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.screenHeader}>İzle</Text>
                <TouchableOpacity style={styles.addFormButton} onPress={createVideo}>
                    <FontAwesome5
                        name={"plus-circle"}
                        size={30}>
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
            <SearchBarComponent/>
            <ScrollView style={styles.videoViewStyle}>
                {data.map((video) => {
                    
                    return (
                        <VideoComponent
                            key={video.id}
                            name={video.videoName}
                            publisher={video.videoPublisher}
                            length={video.videoLength}
                            uri={video.videoUri}
                        />
                    );
                })}
            </ScrollView>


        </SafeAreaView>
    );

}

export default VideoScreen;