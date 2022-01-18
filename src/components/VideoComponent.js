import { Dimensions, View, Text, Image } from "react-native";
import React from "react";
import styles from "../screens/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from 'react-native-elements';

const VideoComponent = (props) => {

    const avatarURL = "https://randomuser.me/api/portraits/men/36.jpg";

    return (
        <View>
            <TouchableOpacity>
                <View style={styles.videoBoxStyle}>
                    <Image style={styles.videoImageStyle} source={{ uri: props.uri }} />
                    <View style={styles.videoLengthContainer}>
                        <Text style={styles.videoLengthStyle}>{props.length}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.videoInfoStyle}>
                <TouchableOpacity>
                    <Avatar
                        size={Dimensions.get('window').width / 10}
                        rounded
                        source={{ uri: avatarURL }}

                    >
                    </Avatar>
                </TouchableOpacity>
                <View style={styles.videoTextContainer}>
                    <Text>
                        <Text style={styles.videoHeader}>{props.name + '\n'}</Text>
                        <Text style={styles.videoPublisher}>{props.publisher}</Text>
                    </Text>
                </View>
            </View>
        </View>
    );

}

export default VideoComponent;