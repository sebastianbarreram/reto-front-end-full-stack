import * as React from 'react';
import { SafeAreaView } from 'react-native';
import RootStack from './src/navigation/RootStack';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: { flex: 1 },
};

export default App;
