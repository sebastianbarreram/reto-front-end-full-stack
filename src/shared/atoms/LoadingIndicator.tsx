import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ced1" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '75%',
    height: 48,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 17,
    borderRadius: 4,
  },
});

export default LoadingIndicator;
