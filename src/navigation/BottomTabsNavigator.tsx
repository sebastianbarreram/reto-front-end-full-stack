import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { TasksScreen } from '../modules/Tasks/screens/TasksScreen';
import { ProfileScreen } from '../modules/Profile/screens/ProfileScreen';
import { RootState } from '../redux/storage/configStore';

export const BottomTabsNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { user } = useSelector((state: RootState) => state.user);

  const getTabBarIcon = (route: any, color: string, size: number) => {
    let iconName;

    if (route.name === 'Tasks') {
      iconName = 'task-alt';
    } else if (route.name === 'Profile') {
      iconName = 'person';
    }

    return <Icon name={iconName || 'help'} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => getTabBarIcon(route, color, size),
        tabBarActiveTintColor: '#00ced1',
        tabBarInactiveTintColor: 'gray',
      })}>
      {user.isAuthenticated && (
        <Tab.Screen
          name="Tasks"
          component={TasksScreen}
          options={{ title: 'Tasks' }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};
