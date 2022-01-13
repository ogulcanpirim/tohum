import React from 'react'
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import SearchBarComponent from '../components/SearchBarComponent';
import styles from './styles';
const RentScreen = (props) => {

    return(
        <SafeAreaView>
             <Text style={styles.screenHeader}>Kirala</Text>
             <SearchBarComponent/>
        </SafeAreaView>
    );

}

export default RentScreen;