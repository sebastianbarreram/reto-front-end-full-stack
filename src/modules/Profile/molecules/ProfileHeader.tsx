import React from 'react';
import UserName from '../atoms/UserName';
import UserEmail from '../atoms/UserEmail';
import UserAvatar from '../atoms/UserAvatar';
import { View, StyleSheet } from 'react-native';

interface ProfileHeaderProps {
  email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ email }) => {
  return (
    <View style={styles.header}>
      <UserAvatar size={100} />
      <UserName email={email} />
      <UserEmail email={email} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
});

export default ProfileHeader;
