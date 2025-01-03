import Logo from '../components/Logo';
import React, { useState } from 'react';
import InputTextContainer from '../components/InputTextContainer';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const LoginScreen = () => {
  const login = async () => {
    try {
      console.log('Login');
    } catch (err) {
      Alert.alert(
        'Login error',
        'An unexpected error ocurred. Please try logging in again',
      );
    }
  };
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Logo size={48} />
        </View>
        <View style={styles.instructionContainer}>
          <Text style={styles.textInstruction}>Login or sign up for free</Text>
        </View>
        <View style={styles.buttonContainer}>
          <InputTextContainer
            style={styles.textContainer}
            iconName="person"
            placeHolder="Email"
            handleOnChange={setEmailInput}
            value={emailInput}
          />
          <InputTextContainer
            style={styles.passwordInputContainer}
            iconName="lock-open"
            placeHolder="New password"
            type="password"
            handleOnChange={setPasswordInput}
            value={passwordInput}
          />
          <TouchableOpacity style={styles.button} onPress={() => login()}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.signUp}>
              Don't have an account?{' '}
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 150,
  },
  input: {
    textAlignVertical: 'center',
    padding: 8,
    marginLeft: 12,
    color: 'black',
    fontSize: 16,
  },
  line: {
    flex: 1,
    height: 1,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  containerLine: {
    flexDirection: 'row',
    width: '75%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  textLine: {
    alignSelf: 'center',
    paddingHorizontal: 5,
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '400',
  },
  button: {
    width: '75%',
    height: 48,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#00ced1',
    marginVertical: 17,
    borderRadius: 4,
  },
  mainContainer: {
    height: '100%',
    flexDirection: 'column',
    padding: 5,
    paddingBottom: 38,
    backgroundColor: 'white',
  },
  instructionContainer: {
    height: 41,
    marginBottom: 9,
  },
  textInstruction: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    height: 48,
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  container: {
    color: 'green',
    backgroundColor: 'yellow',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    marginVertical: 15,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    marginVertical: 15,
  },
  signUp: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
  },
  signUpLink: {
    color: '#00ced1',
    fontWeight: 'bold',
  },
});
