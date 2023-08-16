/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {
  SafeAreaView,
  // ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  // Text,
  // View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import OnboardingThreeScreen from './screen/onboarding/OnboardingThree/OnboardingThreeScreen';
const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <OnboardingThreeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8ac3ee',
    height: '100%',
  },
  innerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textContainer: {
    marginHorizontal: 20,
  },

  sectionTitle: {
    // fontSize: ,
    // fontWeight: '600',
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  onBoard: {
    position: 'absolute',
    bottom: '8%',
    right: '6%',
    backgroundColor: '#f00',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default App;
