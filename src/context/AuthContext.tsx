import React, { useState } from 'react';
import { Alert } from 'react-native';

const AuthContextProvider = (props: any) => {
  const [loading] = useState(true);
  const [loggedIn] = useState<boolean>();
  const [userData] = useState<
    | {
        name: string;
        picture: string;
      }
    | undefined
  >();

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

  const value = {
    loading,
    loggedIn,
    login,
    userData,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

const AuthContext = React.createContext<any>(null);

export { AuthContext, AuthContextProvider };
