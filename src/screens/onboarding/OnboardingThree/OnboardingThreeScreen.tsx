import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Logo from '../../../../assets/undraw_content_team_re_6rlg.svg';
import OnboardingButton from '../../../components/button/onbounding/OnboardingButton';
const OnboardingThreeScreen = ({navigation}): JSX.Element => {
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '10%',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: '#6c63ff',
            borderRadius: 100 / 2,
          }}
        />
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: '#6c63ff',
            borderRadius: 100 / 2,
            marginHorizontal: 4,
          }}
        />
        <View
          style={{
            width: 8,
            height: 8,
            backgroundColor: '#6c63ff',
            borderRadius: 100 / 2,
          }}
        />
      </View>
      <OnboardingButton text="Next" style={styles.onBoardNext} />
      <OnboardingButton text="Previous" style={styles.onBoardPrevious} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#8ac3ee',
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
  onBoardNext: {
    position: 'absolute',
    bottom: '8%',
    right: '6%',
    backgroundColor: '#f00',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    width: '25%',
  },
  onBoardPrevious: {
    position: 'absolute',
    bottom: '8%',
    left: '6%',
    backgroundColor: '#f00',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    width: '25%',
  },
});

export default OnboardingThreeScreen;
