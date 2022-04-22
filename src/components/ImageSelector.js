import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        height: screenHeight / 8,
        marginRight: screenWidth / 25,
        marginLeft: screenWidth / 25,
        borderColor: '#000000',
        borderWidth: 2,
        marginTop: screenHeight / 50,
        padding: 10,
        flexDirection: 'row',
    },

    imageContainer: {
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "transparent",
        width: screenWidth / 5,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    badge: {
        position: 'absolute',
        height: 20,
        width: 20,
        top: -5,
        right: -5,
        backgroundColor: '#ff2222',
        borderRadius: 16,
        justifyContent: 'center',
        zIndex: 2,
    },

})

const ImageSelector = (props) => {

    const { theme, items, setItems } = props;

    const openGallery = () => {

        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: Dimensions.get('window').height,
                maxWidth: Dimensions.get('window').width,
                quality: 1,
                selectionLimit: 10,
            },
            async (response) => {
                if (!response.hasOwnProperty("didCancel")) {
                    const newImages = response.assets.map(e => {
                        const uri = e.uri;
                        const name = e.fileName;
                        return { uri, name };
                    });
                    setItems(newImages);
                }
            },
        )
    }

    const ImageContainer = (props) => {

        const deleteItem = () => {
            setItems((items) => items.filter(e => e.uri !== props.image));
        }

        return (
            <TouchableOpacity style={{ ...styles.imageContainer, borderColor: theme.colors.border }} onPress={openGallery}>
                <TouchableOpacity style={styles.badge} onPress={deleteItem}>
                    <Entypo
                        style={{ alignSelf: 'center' }}
                        size={18}
                        name={"cross"}
                        color={"#fff"}
                    />
                </TouchableOpacity>
                <Image source={{ uri: props.image }} style={{ width: '100%', height: '100%', borderRadius: 10, }} />
            </TouchableOpacity>
        );

    }

    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }}>
            {items.length !== 0 ?
                <FlatList
                    data={items}
                    renderItem={({ item }) => <ImageContainer image={item.uri} />}
                    keyExtractor={item => item.name.toString()}
                    horizontal={true}
                />
                :
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.colors.cardBackground }} onPress={openGallery}>
                    <Text style={{ alignSelf: 'center', color: theme.colors.text, fontSize: 15 }}>Fotoğraf yüklemek için dokunun !</Text>
                </TouchableOpacity>}
        </View>
    );
}

export default ImageSelector;