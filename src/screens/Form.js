import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import SearchBarComponent from '../components/SearchBarComponent';
import FormCardComponent from '../components/FormCardComponent';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FormScreen = (props) => {

    const createForm = () => {
        props.navigation.navigate("CreateForm");
    }

    const userForms = () => {
        props.navigation.navigate("UserForms");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.screenHeader}>Forum</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.addFormButton} onPress={userForms}>
                        <MaterialIcons
                            name={"my-library-books"}
                            size={30}>
                        </MaterialIcons>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addFormButton} onPress={createForm}>
                        <MaterialIcons
                            name={"library-add"}
                            size={30}>
                        </MaterialIcons>
                    </TouchableOpacity>
                </View>
            </View>
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

export default FormScreen;