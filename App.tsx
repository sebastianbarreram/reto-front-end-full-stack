import * as React from 'react';
import RootStack from './src/navigation/RootStack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { ConfigStorage } from './src/redux/storage/configStore';

const App = () => {
  return (
    <Provider store={ConfigStorage}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
