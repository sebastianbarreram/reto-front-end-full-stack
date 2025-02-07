import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ModalContainerProps {
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => (
  <View style={styles.modalContainer}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },
});

export default ModalContainer;
