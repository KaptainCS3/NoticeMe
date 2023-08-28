import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Home from './screens/container/home/Home';
import User from './screens/container/user/User';
import Events from './screens/container/event/Events';
import Participant from './screens/container/participant/Participant';
import CreateEvent from './components/createEvent/CreateEvent';
import CreateParticipant from './components/createParticipant/CreateParticipant';
import Login from './screens/auth/Login';
const Stack = createNativeStackNavigator();

export const Screens = () => {
  return (
    <Stack.Navigator 
    screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="Participant" component={Participant} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen name="CreateParticipant" component={CreateParticipant} />
    </Stack.Navigator>
  );
};
const App = (): JSX.Element => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Screens"
            component={Screens}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Login /> */}
    </>
  );
};

export default App;
