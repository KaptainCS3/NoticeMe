import React from 'react';
import {
  useColorScheme,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import EventContainer from '../../../components/EventContainer/EventContainer';
import Actions from '../../../components/Actions/Actions';
import {TypeScreens} from '../../../types/generics/TypeScreens';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<TypeScreens, 'Home'>;
};

const Home: React.FC<Props> = ({navigation}) => {
  const showCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  const showCreateParticipant = () => {
    navigation.navigate('CreateParticipant');
  };
  
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
                marginTop: 10,
              }}></View>
            <EventContainer />
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

export default Home;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8ac3ee',
    height: '100%',
  },
  container: {
    width: '100%',
    paddingHorizontal: 25,
    position: 'relative',
  },
});
