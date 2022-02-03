import React from 'react'
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import SearchBarComponent from '../components/SearchBarComponent';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import RentCardComponent from '../components/RentCardComponent';
const RentScreen = (props) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.screenHeader}>Kirala</Text>
                <TouchableOpacity style={styles.addFormButton}>
                    <FontAwesome5
                        name={"plus-circle"}
                        size={30}>
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
            <SearchBarComponent />
            <ScrollView>
                <RentCardComponent/>
                <RentCardComponent/>
                <RentCardComponent/>
            </ScrollView>
        </SafeAreaView>
    );

}

export default RentScreen;