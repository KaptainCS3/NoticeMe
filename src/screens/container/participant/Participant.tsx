import React, {useEffect} from 'react';
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
import {TypeScreens} from '../../../types/generics/TypeScreens';
import {StackNavigationProp} from '@react-navigation/stack';
type Props = {
  navigation: StackNavigationProp<TypeScreens, 'Home'>;
};

const Participant: React.FC<Props> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const showCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  const showCreateParticipant = () => {
    navigation.navigate('CreateParticipant');
  };

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
            <View style={{marginTop: 10}}>
              <ParticipantContainer />
            </View>
          </View>
        </ScrollView>
        <Actions
          showCreateEvent={showCreateEvent}
          showCreateParticipant={showCreateParticipant}
        />
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
