import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import SplashScreen from 'react-native-splash-screen';

const HomeScreen = (props) => {

    useEffect(()=> {
        SplashScreen.hide();
    },[]);

    return(
        <SafeAreaView>
            <Text style={styles.screenHeader}>Ana Sayfa</Text>
        </SafeAreaView>
    );

}

export default HomeScreen;