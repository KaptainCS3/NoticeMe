// import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingOneScreen from '../onboarding/OnboardingOne/OnboardingOneScreen';
import OnboardingTwoScreen from '../onboarding/OnboardingTwo/OnboardingTwoScreen';
import OnboardingThreeScreen from '../onboarding/OnboardingThree/OnboardingThreeScreen';
import Login from '../auth/Login';

const Stack = createNativeStackNavigator();

export const AppContainer = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="onboarding-one"
          component={OnboardingOneScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding-two"
          component={OnboardingTwoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding-three"
          component={OnboardingThreeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};
