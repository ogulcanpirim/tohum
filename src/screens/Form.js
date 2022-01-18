import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchBarComponent from '../components/SearchBarComponent';
import FormCardComponent from '../components/FormCardComponent';
import { ScrollView } from 'react-native-gesture-handler';
import VideoComponent from '../components/VideoComponent';

const FormScreen = (props) => {

    const createForm = () => {
        props.navigation.navigate("CreateForm");
    }
    return (
        <SafeAreaView style = {{flex: 1}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.screenHeader}>Forum</Text>
                <TouchableOpacity style={styles.addFormButton} onPress={createForm}>
                    <FontAwesome5
                        name={"plus-circle"}
                        size={30}>
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
            <SearchBarComponent />
            <ScrollView style = {styles.listViewStyle}>
                <FormCardComponent/>
                <FormCardComponent/>
                <FormCardComponent/>
                <FormCardComponent/>
                <FormCardComponent/>
                <FormCardComponent/>
                <FormCardComponent/>
                <FormCardComponent/>
                <FormCardComponent/>
                <FormCardComponent/>
            </ScrollView>
        </SafeAreaView>
    );

}

export default FormScreen;