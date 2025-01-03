import { StyleSheet } from 'react-native';

interface Props {
  color?: string;
}

export const styles = ({ color = '#1554F7' }: Props) =>
  StyleSheet.create({
    transaction: {
      // backgroundColor: '#f9c2ff',
      padding: 5,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
    },
    reason: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      paddingRight: 5,
    },
    date: {
      fontSize: 18,
      // fontWeight: 'bold',
      color: '#666666',
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    textContainer: {
      flex: 1,
      marginLeft: 10,
      // backgroundColor: 'green',
    },
    amountContainer: {
      flex: 1,
      backgroundColor: 'green',
    },
    incomeAmount: {
      fontSize: 18,
      color: '#228922',
      fontWeight: 'bold',
    },
    outcomeAmount: {
      fontSize: 18,
      color: 'red',
      fontWeight: 'bold',
    },
    balanceText: {
      fontSize: 50,
      color: 'white',
      textAlign: 'center',
      textAlignVertical: 'center',
      padding: 20,
      paddingBottom: 0,
      fontWeight: '400',
    },
    balanceContainer: {
      height: 170,
      alignItems: 'stretch',
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
    logoLogin: {
      position: 'absolute',
      top: '11%',
      borderColor: 'blue',
      flex: 1,
    },
    circle: {
      backgroundColor: color ? color : '',
      borderRadius: 100000000,
      top: -1040,
      height: 1200,
      left: -350,
      position: 'absolute',
      width: 950,
    },
  });
