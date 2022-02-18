import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchBarComponent from '../components/SearchBarComponent';
import FormCardComponent from '../components/FormCardComponent';

const UserFormScreen = (props) => {

    const goBack = () => {
        props.navigation.goBack();
    }

    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                <AntDesign
                    name={"back"}
                    size={35}>
                </AntDesign>
            </TouchableOpacity>
            <Text style={styles.screenHeaderWithLogo}>Forumlarım</Text>
            <SearchBarComponent />
            <ScrollView style={styles.listViewStyle}>
                <FormCardComponent />
                <FormCardComponent />
                <FormCardComponent />
                <FormCardComponent />
                <FormCardComponent />
                <FormCardComponent />
                <FormCardComponent />
                <FormCardComponent />
                <FormCardComponent />
                <FormCardComponent />
            </ScrollView>
        </SafeAreaView>
    );

}

export default UserFormScreen;