import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface UserNameProps {
  email: string;
}

const UserName: React.FC<UserNameProps> = ({ email }) => {
  const name = email.split('@')[0];
  return <Text style={styles.name}>{name}</Text>;
};

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'System',
    color: '#333',
  },
});

export default UserName;
