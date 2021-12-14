import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from '../screens/Welcome';
import RegisterScreen from '../screens/Register';
import SignInScreen from '../screens/SignIn';
import HomeScreen from '../screens/Home';
import RentScreen from '../screens/Rent';
import FormScreen from '../screens/Form';
import MarketScreen from '../screens/Market';
import VideoScreen from '../screens/Video';
import ProfileScreen from '../screens/Profile';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function BottomNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                
            })}>
            <Tab.Screen name="Ev" component={HomeScreen} />
            <Tab.Screen name="Kirala" component={RentScreen} />
            <Tab.Screen name="Forum" component={FormScreen} />
            <Tab.Screen name="Market" component={MarketScreen} />
            <Tab.Screen name="İzle" component={VideoScreen} />
            <Tab.Screen name="Profil" component={ProfileScreen} />
            
        </Tab.Navigator>
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
                <Stack.Screen name="AppScreens" component={BottomNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}