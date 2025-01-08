import React from 'react';
import { LoginScreen } from '../screens/LoginScreen';
import { TasksScreen } from '../screens/TasksScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LaunchScreen } from '../screens/LaunchScreen';

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
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
