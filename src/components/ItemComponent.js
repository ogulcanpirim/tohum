import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LogComponent from './LogComponent';

const styles = StyleSheet.create({
    container: {
        margin: 15,
        flex: 1,
        height: Dimensions.get("window").height / 3.5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: .2,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 10,
            height: 10,
        },
    },
    imageContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        height: '60%',
    },

    infoContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderRadius: 20
    },

    detailContainer: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    itemName: {
        fontWeight: '400',
    },

    priceStyle: {
        fontWeight: '800',
    },

    unitContainer: {
        flexDirection: 'row',
    },
    unitStyle: {
        marginLeft: 5,
        marginRight: 5,
        fontWeight: '600',
        fontSize: 20,
    }
})


const ItemComponent = (props) => {

    const [count, setCount] = useState(1);
    const [add, setAdd] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");

    useEffect(() => {
        if (modalVisible) {
            setTimeout(() => setModalVisible(false), 5000);
        }
    }, [modalVisible])


    const addItem = () => {

        if (!add) {
            setModalText("Katı gübre sepetinize eklendi");
            setModalVisible(true);
        }
        else {
            setModalText("Katı gübre sepetinizden çıkarıldı");
            setModalVisible(true);
        }
        setAdd(!add);
    }
    const image = "https://picsum.photos/1200/600";
    return (
        <View style={styles.container}>
            <Image style={styles.imageContainer} source={{ uri: image }} />
            <View style={styles.infoContainer}>
                <Text style={styles.itemName}>Katı Gübre</Text>
                <Text style={styles.priceStyle}>6.95 ₺</Text>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.unitContainer}>
                    <TouchableOpacity style={{ padding: '5%' }} onPress={() => count > 1 ? setCount(count - 1) : undefined}>
                        <FontAwesome5
                            name={"minus"}
                            size={18}>
                        </FontAwesome5>
                    </TouchableOpacity>
                    <Text style={styles.unitStyle}>{count}</Text>
                    <TouchableOpacity style={{ padding: '5%' }} onPress={() => setCount(count + 1)}>
                        <FontAwesome5
                            name={"plus"}
                            size={18}>
                        </FontAwesome5>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={addItem}>
                    <FontAwesome5
                        name={add ? "cart-arrow-down" : "cart-plus"}
                        size={22}
                        color={add ? "red" : "#26931e"}>
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
            {modalVisible ? <LogComponent success={add} text={modalText} modalVisible={modalVisible} setModalVisible={setModalVisible} /> : undefined}

        </View>
    )
}


export default ItemComponent;