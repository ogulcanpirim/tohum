import React from 'react'
import { SafeAreaView, TextInput, Text, View } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const VideoScreen = (props) => {

    return (
        <SafeAreaView>
            <Text style={styles.screenHeader}>İzle</Text>
            <TextInput style={styles.searchBar} placeholder='Arama yapmak için tıklayınız.' />


        </SafeAreaView>
    );

}

export default VideoScreen;