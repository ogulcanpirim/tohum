import React from 'react'
import { View, SafeAreaView, Text, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ShopCardComponent from '../components/ShopCardComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SwipeListView } from 'react-native-swipe-list-view';

const ShoppingCartScreen = (props) => {

    const goBack = () => {
        props.navigation.goBack();
    }

    const onRightActionStatusChange = rowKey => {
        console.log('onLeftActionStatusChange', rowKey);
    };

    const listViewData = Array(5)
        .fill("")
        .map((_, i) => ({ key: `${i}`, text: `item #${i}` }));

    const HiddenItemWithActions = props => {
        const {
            onDelete,
        } = props;

        //TODO: left button for modifying the amount of the item with 'activated'

        return (
            <TouchableOpacity onPress={onDelete} style={styles.rowBack}>
                <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                    <FontAwesome5
                        name={"trash-alt"}
                        color={"#fff"}
                        size={25}>
                    </FontAwesome5>
                </View>
            </TouchableOpacity>
        );
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        Alert.alert(
            "Sepet Ürününü Sil",
            '"Katı gübre" ürününü sepetinizden çıkarmak istiyor musunuz?'
            , [
                {
                    text: 'Vazgeç',
                    onPress: () => {closeRow(rowMap, rowKey)},
                    style: 'cancel',
                },
                {   text: 'Çıkar', 
                    onPress: () => {deleteItemPress(rowMap, rowKey)},
                    style: 'destructive'
                },
            ]);
    };

    const deleteItemPress = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        console.log(`item with id${rowKey} is deleted !`)
    }

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        );
    }

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.returnButton} onPress={goBack}>
                    <AntDesign
                        name={"back"}
                        size={35}>
                    </AntDesign>
                </TouchableOpacity>
            </View>
            <Text style={styles.screenHeaderWithLogo}>Sepetim</Text>
            <View style={{ padding: 15 }}>
                <SwipeListView style={{ height: '70%' }}
                    data={listViewData}
                    renderItem={(data, rowMap) => (
                        <ShopCardComponent />
                    )}
                    renderHiddenItem={renderHiddenItem}
                    useNativeDriver={false}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    onRightActionStatusChange={onRightActionStatusChange}
                />
                <TouchableOpacity style={styles.checkoutButton}>
                    <FontAwesome5
                        style={{ marginRight: 10 }}
                        name={"money-check-alt"}
                        color={"#fff"}
                        size={15}>
                    </FontAwesome5>
                    <Text style={styles.buttonText}>12.99₺ ÖDEME YAPIN</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

}

export default ShoppingCartScreen;