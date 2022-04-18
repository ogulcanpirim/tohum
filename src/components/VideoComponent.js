import { Dimensions, View, Text, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../screens/styles";
import { Avatar } from 'react-native-elements';

const VideoComponent = (props) => {

    const {theme} = props;
    return (
        <TouchableHighlight onPress={props.goVideo} style={{borderRadius: 10}}>
            <View>
                <View style={styles.videoBoxStyle}>
                    <Image style={styles.videoImageStyle} source={{ uri: props.thumbnail }} />
                    <View style={styles.videoLengthContainer}>
                        <Text style={styles.videoLengthStyle}>{props.length}</Text>
                    </View>
                </View>

                <View style={{...styles.videoInfoStyle, backgroundColor: theme.colors.cardBackground}}>
                    <TouchableOpacity>
                        <Avatar
                            size={Dimensions.get('window').width / 10}
                            rounded
                            source={{ uri: props.userAvatar }}
                        >
                        </Avatar>
                    </TouchableOpacity>
                    <View style={styles.videoTextContainer}>
                        <Text>
                            <Text style={{...styles.videoHeader, color: theme.colors.text}}>{props.name + '\n'}</Text>
                            <Text style={styles.videoPublisher}>{props.publisher}</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

}

export default VideoComponent;