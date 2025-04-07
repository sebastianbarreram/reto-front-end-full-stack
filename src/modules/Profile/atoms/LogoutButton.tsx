import React from 'react';
import { StyleSheet } from 'react-native';
import CustomButton from '../../../shared/atoms/CustomButton';

interface LogoutButtonProps {
  onPress: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return (
    <CustomButton
      title="Logout"
      onPress={onPress}
      style={styles.logoutButton}
      textStyle={styles.logoutText}
      toggleTestID="logout-button"
    />
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ff0000',
    marginTop: 20,
  },
  logoutText: {
    color: '#ff0000',
  },
});

export default LogoutButton;
