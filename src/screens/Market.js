import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MarketScreen = (props) => {

    const navigateShoppingCart = () => {
        props.navigation.navigate("ShoppingCart");
    }


    return(
        <SafeAreaView>
             <View style = {{flexDirection: 'row',justifyContent: 'space-between'}}>
                <Text style={styles.screenHeader}>Market</Text>
                <TouchableOpacity style = {styles.shoppingButton} onPress={navigateShoppingCart}>
                    <FontAwesome5
                        name={"shopping-cart"}
                        size={30}>
                    </FontAwesome5>
                    <View style = {styles.badge}>
                        <Text style = {styles.badgeText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

}

export default MarketScreen;