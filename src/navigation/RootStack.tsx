import React from 'react';
import { LoginScreen } from '../modules/Login/screens/LoginScreen';
import { SignUpScreen } from '../modules/SignUp/screens/SignUpScreen';
import { LaunchScreen } from '../modules/Launch/screens/LaunchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabsNavigator } from './BottomTabsNavigator';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="LaunchScreen"
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}>
      <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="BottomTabsNavigator" component={BottomTabsNavigator} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
