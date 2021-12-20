import React from 'react'
import { SafeAreaView, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
const FormScreen = (props) => {

    const createForm = () => {
        props.navigation.navigate("CreateForm");
    }
    return(
        <SafeAreaView>
             <Text style={styles.screenHeader}>Forum</Text>
             <TextInput style = {styles.searchBar} placeholder='Arama yapmak için tıklayınız.'>
             </TextInput>
             <TouchableOpacity onPress={createForm}style={styles.signinButton}>
                <Text style={styles.buttonText}>FORUM OLUŞTUR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

}

export default FormScreen;