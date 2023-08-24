import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Tabs from './Tabs';

const App = (): JSX.Element => {
  return (
    <>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </>
  );
};

export default App;
