import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const VideoScreen = (props) => {

    return(
        <SafeAreaView>
             <Text style={styles.screenHeader}>İzle</Text>
             <TextInput style = {styles.searchBar} placeholder='Arama yapmak için tıklayınız.'>
             </TextInput>
        </SafeAreaView>
    );

}

export default VideoScreen;