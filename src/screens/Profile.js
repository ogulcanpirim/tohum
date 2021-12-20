import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const ProfileScreen = (props) => {


    const logOut = () => {
        props.navigation.navigate("Welcome");
    }

    const navigateChangePassword = () => {
        props.navigation.navigate("ChangePassword");
    }
    
    const navigateInbox = () => {
        props.navigation.navigate("Inbox");
    }


    return (
        <SafeAreaView style = {{flex: 1}}>
            <View style = {{flexDirection: 'row',justifyContent: 'space-between'}}>
                <Text style={styles.screenHeader}>Profil</Text>
                <TouchableOpacity style = {styles.inboxButton} onPress={navigateInbox}>
                    <FontAwesome5
                        name={"inbox"}
                        size={35}>
                    </FontAwesome5>
                    <View style = {styles.badge}>
                        <Text style = {styles.badgeText}>13</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signOutButton} onPress={logOut}>
                    <FontAwesome5
                        name={"sign-out-alt"}
                        size={35}>
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.passwordButton} onPress={navigateChangePassword}>
                <Text style={styles.buttonText}> ŞİFRE DEĞİŞTİR</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

}

export default ProfileScreen;