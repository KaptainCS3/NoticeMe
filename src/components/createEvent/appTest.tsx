// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
// import React, {useState, useEffect, useCallback} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {AppContainer} from './components/container/app-container';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const App = (): JSX.Element => {
//   const [onboarded, setOnboarded] = useState();

//   // -------------------- EFFECTS -------------------- //
//   useEffect(() => {
//     getStorage();
//   }, []);

//   // -------------------- ACTIONS -------------------- //
//   const getStorage = async () => {
//     const onboarded = await AsyncStorage.getItem('ONBOARDED');
//     setOnboarded(JSON.parse(onboarded));
//   };

//   return (
//     <SafeAreaProvider>
//       <NavigationContainer>
//         <AppContainer onboarded={onboarded} />
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };

// export default App;
