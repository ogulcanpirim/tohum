import React from 'react'
import { SafeAreaView, TextInput, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchBarComponent from '../components/SearchBarComponent';
const FormScreen = (props) => {

    const createForm = () => {
        props.navigation.navigate("CreateForm");
    }
    return (
        <SafeAreaView>
            <View style = {{flexDirection: 'row',justifyContent: 'space-between'}}>
                <Text style={styles.screenHeader}>Forum</Text>
                <TouchableOpacity style = {styles.addFormButton} onPress={createForm}>
                    <FontAwesome5
                        name={"plus-circle"}
                        size={30}>
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
            <SearchBarComponent/>
        </SafeAreaView>
    );

}

export default FormScreen;