import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UserAgreementScreen = (props) => {

    const goBack = () => {
        props.navigation.goBack();
    }
    
    return(
        <SafeAreaView>
            <TouchableOpacity style = {styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={styles.screenHeaderWithLogo}>Kullanıcı Sözleşmesi</Text>
        </SafeAreaView>
    );

}

export default UserAgreementScreen;