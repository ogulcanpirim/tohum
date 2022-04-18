import React from 'react'
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import SearchBarComponent from '../components/SearchBarComponent';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import RentCardComponent from '../components/RentCardComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

const RentScreen = (props) => {

    const theme = useTheme();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{...styles.screenHeader, color: theme.colors.text}}>Kirala</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.addFormButton}>
                        <Ionicons
                            name={"filter"}
                            color={theme.colors.text}
                            size={30}>
                        </Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addFormButton}>
                        <FontAwesome5
                            name={"plus-circle"}
                            color={theme.colors.text}
                            size={30}>
                        </FontAwesome5>
                    </TouchableOpacity>
                </View>
            </View>
            <SearchBarComponent />
            <ScrollView>
                <RentCardComponent theme = {theme}/>
                <RentCardComponent theme = {theme}/>
                <RentCardComponent theme = {theme}/>
            </ScrollView>
        </SafeAreaView>
    );

}

export default RentScreen;