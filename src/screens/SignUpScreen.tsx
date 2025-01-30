import Logo from '../components/Logo';
import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../hooks/useAuth';
import { globalStyles } from '../styles/global-styles';
import LoadingIndicator from '../components/LoadingIndicator';
import { useEmailValidation } from '../hooks/useEmailValidation';
import InputTextContainer from '../components/InputTextContainer';
import { MyStackScreenProps } from '../interfaces/MyStackScreenProps';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';

export const SignUpScreen = ({ navigation }: MyStackScreenProps) => {
  const { createUser } = useUser();
  const { login, loading } = useAuth();
  const { errorMessage, setErrorMessage, validateEmail } = useEmailValidation();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const handleSignUp = async () => {
    try {
      await createUser(emailInput, passwordInput);
      console.log('User created successfully');
      await login(emailInput, passwordInput, navigation);
      Alert.alert('Success', 'User created successfully!', [{ text: 'OK' }]);
    } catch (error) {
      Alert.alert(
        'Error',
        (error as any).message ||
          'There was an error creating the user. Please try again.',
      );
    }
  };

  const handlePasswordInputChange = (password: string, isConfirm: boolean) => {
    if (isConfirm) {
      setConfirmPasswordInput(password);
      if (passwordInput && password !== passwordInput) {
        setErrorMessage('Passwords must match');
      } else {
        setErrorMessage('');
      }
    } else {
      setPasswordInput(password);
      if (confirmPasswordInput && password !== confirmPasswordInput) {
        setErrorMessage('Passwords must match');
      } else {
        setErrorMessage('');
      }
    }
  };

  const handleEmailChange = (email: string) => {
    setEmailInput(email);
    validateEmail(email);
  };

  const isFormValid =
    emailInput && passwordInput && confirmPasswordInput && !errorMessage;

  return (
    <View>
      <View style={globalStyles().mainContainer}>
        <View style={styles.logoContainer}>
          <Logo size={48} />
        </View>
        <View style={styles.instructionContainer}>
          <Text style={styles.textInstruction}>Sign up</Text>
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
            handleOnChange={password =>
              handlePasswordInputChange(password, false)
            }
            value={passwordInput}
          />
          <InputTextContainer
            style={styles.passwordInputContainer}
            iconName="lock-open"
            placeHolder="Confirm new password"
            type="password"
            handleOnChange={confirmPassword =>
              handlePasswordInputChange(confirmPassword, true)
            }
            value={confirmPasswordInput}
          />
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          {loading ? (
            <LoadingIndicator />
          ) : (
            <CustomButton
              title="SIGN UP"
              onPress={handleSignUp}
              disabled={!isFormValid}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <Text style={styles.signIn}>
              Already have an account?{' '}
              <Text style={styles.signInLink}>Sign In</Text>
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
  signIn: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
  },
  signInLink: {
    color: '#00ced1',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
