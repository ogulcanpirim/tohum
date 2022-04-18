import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchBarComponent from '../components/SearchBarComponent';
import { ScrollView } from 'react-native-gesture-handler';
import ItemComponent from '../components/ItemComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

const MarketScreen = (props) => {

    const theme = useTheme();
    const navigateShoppingCart = () => {
        props.navigation.navigate("ShoppingCart");
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...styles.screenHeader, color: theme.colors.text }}>Market</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.addFormButton}>
                        <Ionicons
                            name={"filter"}
                            color={theme.colors.text}
                            size={30}>
                        </Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addFormButton} onPress={navigateShoppingCart}>
                        <FontAwesome5
                            name={"shopping-cart"}
                            color={theme.colors.text}
                            size={30}>
                        </FontAwesome5>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>28</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <SearchBarComponent />
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <ItemComponent theme={theme}></ItemComponent>
                    <ItemComponent theme={theme}></ItemComponent>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <ItemComponent theme={theme}></ItemComponent>
                    <ItemComponent theme={theme}></ItemComponent>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <ItemComponent theme={theme}></ItemComponent>
                    <ItemComponent theme={theme}></ItemComponent>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

export default MarketScreen;