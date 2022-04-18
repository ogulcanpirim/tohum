import React, { useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native';
import styles from './styles';
import SplashScreen from 'react-native-splash-screen';
import { useTheme } from '@react-navigation/native';

const HomeScreen = (props) => {
    
    const theme = useTheme();
    useEffect(()=> {
        SplashScreen.hide();
    },[]);

    return(
        <SafeAreaView>
            <Text style={{...styles.screenHeader, color: theme.colors.text}}>Ana Sayfa</Text>
        </SafeAreaView>
    );

}

export default HomeScreen;