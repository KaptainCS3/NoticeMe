import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Logo from '../../../../assets/undraw_sharing_knowledge_03vp.svg';
const OnboardingOneScreen = ({navigation}): JSX.Element => {
  return (
    <View style={styles.sectionContainer}>
      <View style={{marginBottom: 20}}>
        <Logo height={250} width={250} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.sectionTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit sed
          ullamcorper morbi tincidunt.
        </Text>
      </View>
      <View>
        <Text>Indicators</Text>
      </View>
      <View style={styles.onBoard} />
    </View>
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

export default OnboardingOneScreen;
