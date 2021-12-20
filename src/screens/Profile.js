import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-elements';
import { Dimensions } from 'react-native';

const ProfileScreen = (props) => {

    const avatarURL = "https://randomuser.me/api/portraits/men/36.jpg";

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
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.screenHeader}>Profil</Text>
                <TouchableOpacity style={styles.inboxButton} onPress={navigateInbox}>
                    <FontAwesome5
                        name={"inbox"}
                        size={35}>
                    </FontAwesome5>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>13</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signOutButton} onPress={logOut}>
                    <FontAwesome5
                        name={"sign-out-alt"}
                        size={35}>
                    </FontAwesome5>
                </TouchableOpacity>
            </View>
            <Avatar
                size={Dimensions.get('window').width / 3}
                rounded
                source={{ uri: avatarURL }}
                containerStyle={{ alignSelf: 'center' }}
            >
                <Avatar.Accessory
                    name="plus-circle"
                    type="font-awesome-5"
                    color="#000000"
                    size={32} />
            </Avatar>
            <Text style={styles.profileName}>Baha Akyol</Text>
            <View style={styles.profileLine} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', padding: Dimensions.get('window').height / 50 }}>
                    <Text style={styles.profileTextVariable}>128</Text>
                    <Text style={styles.profileTextConstant}>Takipçi</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', padding: Dimensions.get('window').height / 50 }}>
                    <Text style={styles.profileTextVariable}>89</Text>
                    <Text style={styles.profileTextConstant}>Forum Cevabı</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.profileContent} disabled>
                <FontAwesome5 name={"user-circle"} style={styles.iconButtonStyle} size={30} />
                <Text style={styles.profileText}>bahaakyoll</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContent} disabled>
                <FontAwesome5 name={"envelope"} style={styles.iconButtonStyle} size={30} />
                <Text style={styles.profileText}> example@example.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.passwordButton} onPress={navigateChangePassword}>
                <FontAwesome5 name={"unlock-alt"} style={styles.iconButtonStyle} size={25} color={"#ffffff"} />
                <Text style={styles.profileButtonText}>Şifre değiştir</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );

}

export default ProfileScreen;