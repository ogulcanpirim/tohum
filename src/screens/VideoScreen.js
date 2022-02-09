import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-elements';
import Video from 'react-native-video';

const styles = StyleSheet.create({

    returnButton: {
        marginLeft: Dimensions.get("window").width / 20,
        marginTop: Dimensions.get("window").height / 100,
    },

    videoScreen: {
        marginTop: 10,
        height: "40%",
        width: "100%",
        backgroundColor: '#000',
    },

    videoInfo: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#e2e2e2',
        borderBottomColor: '#000000aa',
        borderBottomWidth: 1,
    },

    videoHeader: {
        fontSize: 18,
        fontWeight: '600',
    },

    videoInfoContainer: {
        padding: 10,
        borderRadius: 4,
    },

    videoPublisher: {
        fontSize: 14,
        color: '#5E72E4',
        fontWeight: '600',
    },

    video: {
        width: '100%',
        height: '100%',
    },

    description: {
        fontSize: 16,
        margin: 15,
    }
});


const VideoComponentScreen = (props) => {


    const route = useRoute();
    const avatarURL = "https://randomuser.me/api/portraits/men/36.jpg";
    const videoURL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
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
            <View style={styles.videoScreen}>
                <Video
                    controls={true}
                    source={{ uri: videoURL}}
                    style={styles.video}>
                </Video>
            </View>
            <View style={styles.videoInfo}>
                <TouchableOpacity>
                    <Avatar
                        size={Dimensions.get('window').width / 7}
                        rounded
                        source={{ uri: avatarURL }}
                    >
                    </Avatar>
                </TouchableOpacity>
                <View style={styles.videoInfoContainer}>
                    <Text style={styles.videoHeader}>{route.params.videoName}</Text>
                    <Text style={styles.videoPublisher}>{route.params.videoPublisher}</Text>
                </View>
            </View>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices aliquet risus quis gravida. Cras vel felis sapien. In tempus, lorem sit amet tincidunt bibendum, neque libero viverra nulla, eu auctor lacus felis fringilla ipsum. Integer hendrerit quis erat at consequat. In ultricies justo vitae finibus sagittis. Nullam nunc elit, auctor eleifend placerat quis, laoreet nec turpis. Proin consequat eros non ipsum viverra ornare. Curabitur ultricies ante enim. Etiam libero libero, ullamcorper eu ex ac, consequat tincidunt tortor. Sed non lectus congue ligula ultrices tempus.</Text>
        </SafeAreaView>
    );
}

export default VideoComponentScreen;