import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LoginScreen } from '../modules/Login/screens/LoginScreen';
import { LaunchScreen } from '../modules/Launch/screens/LaunchScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Launch"
      screenOptions={{
        freezeOnBlur: true,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#1554F7',
          shadowColor: 'transparent',
        },
      }}>
      <Drawer.Screen
        name="Launch"
        component={LaunchScreen}
        options={{
          drawerItemStyle: { display: 'none' },
          headerShown: false,
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          drawerItemStyle: { display: 'none' },
          headerShown: false,
          swipeEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
}
