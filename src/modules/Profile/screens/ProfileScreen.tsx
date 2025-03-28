import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/storage/configStore';
import useDateFormat from '../../../shared/hooks/useDateFormat';
import { logout } from '../../../redux/slices/UserSlice';
import ProfileHeader from '../molecules/ProfileHeader';
import InfoList from '../organisms/InfoList';
import LogoutButton from '../atoms/LogoutButton';
import { MyStackScreenProps } from '../../../shared/interfaces/MyStackScreenProps';

export const ProfileScreen = ({ navigation }: MyStackScreenProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { dateFormat } = useDateFormat();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isAuthenticated === false) {
      navigation.navigate('LaunchScreen');
    }
  }, [user, navigation]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, sign out',
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  const infoItems = [
    { icon: 'email', label: 'Email', value: user.email },
    {
      icon: 'today',
      label: 'Member Since',
      value: dateFormat(user.created_at),
    },
    {
      icon: 'task-alt',
      label: 'Tasks Created',
      value: tasks ? tasks.length.toString() : '0',
    },
  ];

  // Only render the profile content if user is authenticated
  if (!user || !user.isAuthenticated) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ProfileHeader email={user.email} />
      <InfoList items={infoItems} />
      <LogoutButton onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});
