import React from "react";
import { SafeAreaView, Dimensions, Text, View, Image, TouchableOpacity } from "react-native";
import { useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Avatar } from 'react-native-elements';
import styles from "./styles";
import Swiper from 'react-native-swiper'
import { useRoute } from "@react-navigation/native";

const RentItemScreen = (props) => {

    const route = useRoute();
    console.log("route params", route.params);

    const theme = useTheme();
    const goBack = () => {
        props.navigation.goBack();
    }

    /*
    <Image source={{ uri: 'https://picsum.photos/1200/600' }} style={{ width: '100%', height: '100%' }} />
                    <Image source={{ uri: 'https://i.imgur.com/5nltiUd.jpg' }} style={{ width: '100%', height: '100%' }} />
                    <Image source={{ uri: 'https://i.imgur.com/6vOahbP.jpg' }} style={{ width: '100%', height: '100%' }} />
                    <Image source={{ uri: 'https://i.imgur.com/kj5VXtG.jpg' }} style={{ width: '100%', height: '100%' }} />
                    <Image source={{ uri: 'https://i.imgur.com/XP2BE7q.jpg' }} style={{ width: '100%', height: '100%' }} />
    */
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    color={theme.colors.text}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <View style={styles.swiper}>
                <Swiper dotColor={"#fff"} activeDotColor="#26931e">
                    {route.params.images.map((image, index) => {
                        return (
                            <Image key={index} source={{uri: image}} style={{ width: '100%', height: '100%' }} />
                        )
                    })}
                </Swiper>
            </View>
            <View style={{ ...styles.rentContainer, backgroundColor: theme.colors.cardBackground }}>
                <TouchableOpacity>
                    <Avatar
                        size={Dimensions.get('window').width / 7}
                        rounded
                        source={{ uri: 'https://i.imgur.com/6vOahbP.jpg' }}
                    />
                </TouchableOpacity>
                <View style={styles.rentInfoContainer}>
                    <Text style={{ ...styles.rentHeader, color: theme.colors.text }}>{route.params.title}</Text>
                    <Text style={styles.rentPublisher}>{route.params.user}</Text>
                </View>
            </View>
            <Text style={{ color: theme.colors.text, padding: 10 }}>{route.params.description}</Text>
        </SafeAreaView>
    );
}

export default RentItemScreen;