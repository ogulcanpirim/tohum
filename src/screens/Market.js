import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchBarComponent from '../components/SearchBarComponent';
import { ScrollView } from 'react-native-gesture-handler';
import ItemComponent from '../components/ItemComponent';

const MarketScreen = (props) => {

    const navigateShoppingCart = () => {
        props.navigation.navigate("ShoppingCart");
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.screenHeader}>Market</Text>
                <TouchableOpacity style={styles.shoppingButton} onPress={navigateShoppingCart}>
                    <FontAwesome5
                        name={"shopping-cart"}
                        size={30}>
                    </FontAwesome5>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>28</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <SearchBarComponent />
            <ScrollView style={styles.marketItemStyle}>
                <View style={{flexDirection: 'row'}}>
                    <ItemComponent></ItemComponent>
                    <ItemComponent></ItemComponent>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ItemComponent></ItemComponent>
                    <ItemComponent></ItemComponent>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <ItemComponent></ItemComponent>
                    <ItemComponent></ItemComponent>
                </View>
            </ScrollView>
        </SafeAreaView>
    );

}

export default MarketScreen;