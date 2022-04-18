import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { TextInput, TouchableOpacity } from 'react-native';
import styles from "../screens/styles";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '@react-navigation/native';


const SearchBarComponent = (props) => {

    const { text, setText, loading } = props;
    const theme = useTheme();
    const clear = () => {
        setText("");
    }
    return (
        <View style={styles.searchBarContainer}>
            <TextInput style={{...styles.searchBarText, color: theme.colors.text, borderColor: theme.colors.border}} placeholder="Arama yapmak için tıklayınız." value={text} onChangeText={setText} />
            <TouchableOpacity onPress={clear} style={styles.searchBarIcon}>
                {loading ? <ActivityIndicator /> : <FontAwesome5
                    name={text?.length > 0 ? "times" : "search-plus"}
                    color={"#cad1d7"}
                    size={20}
                />}
            </TouchableOpacity>
        </View>

    )

}

export default SearchBarComponent;