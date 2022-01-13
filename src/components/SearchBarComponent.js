import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, TouchableOpacity } from 'react-native';
import styles from "../screens/styles";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const SearchBarComponent = (props) => {

    const [text, setText] = useState("");

    const clear = () => {
        this.textInput.clear();
        setText("");
    }

    return (
        <View style={styles.searchBarContainer}>
            <TextInput ref={input => { this.textInput = input }} style={styles.searchBarText} placeholder="Arama yapmak için tıklayınız." value={text} onChangeText={setText}/>
            <TouchableOpacity onPress={clear} style={styles.searchBarIcon}>
            <FontAwesome5
                    name={text.length > 0 ? "times" : "search-plus"}
                    color={"#cad1d7"}
                    size={20}
                >
            </FontAwesome5>
            </TouchableOpacity>
        </View>

    )




}

export default SearchBarComponent;