import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import WelcomeScreen from '../screens/Welcome';
import RegisterScreen from '../screens/Register';
import SignInScreen from '../screens/SignIn';
import HomeScreen from '../screens/Home';
import RentScreen from '../screens/Rent';
import FormScreen from '../screens/Form';
import MarketScreen from '../screens/Market';
import VideoScreen from '../screens/Video';
import ProfileScreen from '../screens/Profile';
import ChangePasswordScreen from '../screens/ChangePassword';
import CreateFormScreen from '../screens/CreateForm';
import InboxScreen from '../screens/Inbox';
import ShoppingCartScreen from '../screens/ShoppingCart';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import ChatScreen from '../screens/ChatScreen';
import UploadVideoScreen from '../screens/UploadVideo';
import VideoComponentScreen from '../screens/VideoScreen';
import UserVideoScreen from '../screens/UserVideos';
import UserFormScreen from '../screens/UserForms';
import UserScreen from '../screens/UserScreen';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function BottomNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#26931e',
                tabBarIcon: ({ focused, color, size, padding }) => {

                    let iconName;
                    if (route.name == 'Ev') {
                        iconName = 'home';
                    } else if (route.name == 'Kirala') {
                        iconName = 'truck';
                    } else if (route.name == 'Forum') {
                        iconName = 'users';
                    } else if (route.name == 'Market') {
                        iconName = 'shopping-basket';
                    } else if (route.name == 'İzle') {
                        iconName = 'video';
                    } else if (route.name == 'Profil') {
                        iconName = 'user-alt';
                    }


                    return (
                        <FontAwesome5 name={iconName} size={size} color={color} style={{ paddingBottom: padding }}></FontAwesome5>

                    );
                },
            })}>
            <Tab.Screen name="Ev" component={HomeScreen} />
            <Tab.Screen name="Kirala" component={RentScreen} />
            <Tab.Screen name="Forum" component={FormScreens} />
            <Tab.Screen name="Market" component={MarketScreens} />
            <Tab.Screen name="İzle" component={VideoScreens} />
            <Tab.Screen name="Profil" component={ProfileScreens} />

        </Tab.Navigator>
    );
}

const ProfileStack = createStackNavigator();

function ProfileScreens() {
    return (
        <ProfileStack.Navigator initialRouteName="Profil_Entrance" screenOptions={{
            headerShown: false
        }}>
            <ProfileStack.Screen name="Profil_Entrance" component={ProfileScreen} />
            <ProfileStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <ProfileStack.Screen name="ChatScreens" component={ChatScreens} />
        </ProfileStack.Navigator>
    );
}

const ChatStack = createStackNavigator();

function ChatScreens() {
    return (
        <ChatStack.Navigator initialRouteName="Inbox" screenOptions={{
            headerShown: false
        }}>
            <ChatStack.Screen name="Inbox" component={InboxScreen} />
            <ChatStack.Screen name="ChatScreen" component={ChatScreen} />
            <ChatStack.Screen name="UserScreen" component={UserScreen} />
        </ChatStack.Navigator>
    );
}

const FormStack = createStackNavigator();

function FormScreens() {
    return (
        <FormStack.Navigator initialRouteName="Form_Entrance" screenOptions={{
            headerShown: false
        }}>
            <FormStack.Screen name="Form_Entrance" component={FormScreen} />
            <FormStack.Screen name="CreateForm" component={CreateFormScreen} />
            <FormStack.Screen name="UserForms" component={UserFormScreen}/>
        </FormStack.Navigator>
    );
}

const MarketStack = createStackNavigator();
function MarketScreens() {
    return (
        <MarketStack.Navigator initialRouteName="Market_Entrance" screenOptions={{
            headerShown: false
        }}>
            <MarketStack.Screen name="Market_Entrance" component={MarketScreen} />
            <MarketStack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
        </MarketStack.Navigator>
    );
}

const VideoStack = createStackNavigator();
function VideoScreens() {
    return (
        <VideoStack.Navigator initialRouteName="Video_Entrance" screenOptions={{
            headerShown: false
        }}>
            <VideoStack.Screen name="Video_Entrance" component={VideoScreen} />
            <VideoStack.Screen name="UploadVideo" component={UploadVideoScreen} />
            <VideoStack.Screen name="VideoComponent" component={VideoComponentScreen} />
            <VideoStack.Screen name="UserVideos" component={UserVideoScreen} />
        </VideoStack.Navigator>
    );
}

export default function NavigatorComponent(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="UserAgreement" component={BottomNavigator} />
                <Stack.Screen name="PolicyAgreement" component={BottomNavigator} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="AppScreens" component={BottomNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}