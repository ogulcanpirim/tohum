import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchBarComponent from '../components/SearchBarComponent';
import { data } from '../data/video_dummy';
import VideoComponent from '../components/VideoComponent';

const UserVideoScreen = (props) => {

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
            <Text style={styles.screenHeaderWithLogo}>Videolarım</Text>
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

export default UserVideoScreen;