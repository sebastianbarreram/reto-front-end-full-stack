import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LoginScreen />
    </SafeAreaView>
  );
};

const styles = {
  safeArea: { flex: 1 },
};

export default App;
