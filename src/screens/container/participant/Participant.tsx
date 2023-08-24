import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import ParticipantContainer from '../../../components/participantContainer/ParticipantContainer';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Actions from '../../../components/Actions/Actions';

interface Props {
  text: string;
}
const Participant = ({text}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <>
      <SafeAreaView style={styles.sectionContainer}>
        <ScrollView>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <View style={styles.container}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.heading}>{text}</Text>
            </View>
            <ParticipantContainer />
            <ParticipantContainer />
            <ParticipantContainer />
            <ParticipantContainer />
            <ParticipantContainer />
          </View>
        </ScrollView>
        <Actions />
      </SafeAreaView>
    </>
  );
};

export default Participant;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#8ac3ee',
    height: '100%',
  },
  container: {
    width: '100%',
    paddingHorizontal: 25,
    position: 'relative',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
});
