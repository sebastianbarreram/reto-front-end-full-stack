import Logo from '../components/Logo';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { globalStyles } from '../styles/global-styles';
import LoadingIndicator from '../components/LoadingIndicator';
import { useEmailValidation } from '../hooks/useEmailValidation';
import InputTextContainer from '../components/InputTextContainer';
import { MyStackScreenProps } from '../interfaces/MyStackScreenProps';
import { Text, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';

export const LoginScreen = ({ navigation }: MyStackScreenProps) => {
  const { login, loading } = useAuth();
  const { errorMessage, validateEmail } = useEmailValidation();

  const handleLogin = async () => {
    try {
      await login(emailInput, passwordInput, navigation);
    } catch (error) {
      Alert.alert(
        'Login error',
        (error as any).message || 'An unexpected error occurred. Please try logging in again',
      );
    }
  };

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleEmailChange = (email: string) => {
    setEmailInput(email);
    validateEmail(email);
  };

  const isFormValid = emailInput && passwordInput && !errorMessage;

  return (
    <View>
      <View style={globalStyles().mainContainer}>
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
            handleOnChange={handleEmailChange}
            value={emailInput}
          />
          <InputTextContainer
            style={styles.passwordInputContainer}
            iconName="lock-open"
            placeHolder="Password"
            type="password"
            handleOnChange={setPasswordInput}
            value={passwordInput}
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          {loading ? (
            <LoadingIndicator />
          ) : (
            <TouchableOpacity
              style={[styles.button, !isFormValid && styles.buttonDisabled]}
              onPress={() => handleLogin()}
              disabled={!isFormValid}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
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
  instructionContainer: {
    height: 41,
    marginBottom: 9,
  },
  textInstruction: {
    alignSelf: 'center',
    fontSize: 15,
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
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  signUpLink: {
    color: '#00ced1',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#b0e0e6',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
