import React from 'react';
import { View, StyleSheet } from 'react-native';

const ModalView: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.modalView}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalView;
