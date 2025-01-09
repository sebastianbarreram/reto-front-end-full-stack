import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/storage/configStore';

export const TasksScreen = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <View>
      <Text>"TasksScreen" email: {user.email} id: {user.id}</Text>;
    </View>
  );
};
