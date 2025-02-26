import React from 'react';
import { Text, StyleSheet } from 'react-native';

const PickerLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text style={styles.label}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
    marginRight: 10,
  },
});

export default PickerLabel;
