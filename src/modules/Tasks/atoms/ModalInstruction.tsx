import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ModalInstructionProps {
  children: React.ReactNode;
}

const ModalInstruction: React.FC<ModalInstructionProps> = ({ children }) => (
  <Text style={styles.modalInstruction}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  modalInstruction: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ModalInstruction;
