import React from 'react';
import { View, StyleSheet } from 'react-native';

const PickerContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default PickerContainer;
