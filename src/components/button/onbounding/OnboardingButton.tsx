import React from 'react';
import {View, Text} from 'react-native';
interface ButtonText {
  text: string;
  style: {};
}
const OnboardingButton = ({text, style}: ButtonText) => {
  return (
    <>
      <View style={style}>
        <Text>{text}</Text>
      </View>
    </>
  );
};

export default OnboardingButton;
