import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface UserEmailProps {
  email: string;
}

const UserEmail: React.FC<UserEmailProps> = ({ email }) => {
  return <Text style={styles.email}>{email}</Text>;
};

const styles = StyleSheet.create({
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    fontFamily: 'System',
  },
});

export default UserEmail;
