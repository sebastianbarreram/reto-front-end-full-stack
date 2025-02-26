import { StyleSheet } from 'react-native';

export const styles = () =>
  StyleSheet.create({
    task: {
      backgroundColor: '#f9c2ff',
      padding: 5,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
    },
    logo: {
      width: 140,
      height: 140,
    },
    containerLaunchScreen: {
      backgroundColor: 'white',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleAppLaunchScreen: {
      color: 'black',
      fontSize: 30,
      fontWeight: '400',
      position: 'absolute',
      bottom: '8.75%',
    },
  });
