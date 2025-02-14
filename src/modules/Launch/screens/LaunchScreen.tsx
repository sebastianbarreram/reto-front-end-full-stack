import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Logo from '../../../shared/atoms/Logo';
import { styles } from '../../../themes/GlobalTheme';
import { MyStackScreenProps } from '../../../shared/interfaces/MyStackScreenProps';

export const LaunchScreen = ({ navigation }: MyStackScreenProps) => {
  useEffect(() => {
    setTimeout(() => navigation.navigate('LoginScreen'), 20);
    // setTimeout(() => navigation.navigate('LoginScreen'), 3000);
  });
  return (
    <View style={styles({}).containerLaunchScreen}>
      <Logo />
      <Text style={styles({}).titleAppLaunchScreen}>My App</Text>
    </View>
  );
};
