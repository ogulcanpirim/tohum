import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { TextInput, TouchableOpacity } from 'react-native';
import styles from "../screens/styles";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const SearchBarComponent = (props) => {

    const { text, setText, searchFunction } = props;
    const [loading, setLoading] = useState(false);

    const clear = () => {
        this.textInput.clear();
        onChangeFunction("");
    }

    const onChangeFunction = async (text) => {
        setLoading(true);
        await searchFunction(text);
        setText(text);
        setLoading(false);
    }

    return (
        <View style={styles.searchBarContainer}>
            <TextInput ref={input => { this.textInput = input }} style={styles.searchBarText} placeholder="Arama yapmak için tıklayınız." value={text} onChangeText={onChangeFunction} />
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