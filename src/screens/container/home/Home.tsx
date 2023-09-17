import React, {useEffect} from 'react';
import {
  useColorScheme,
  View,
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
import {MaterialIndicator} from 'react-native-indicators';
import {useAppSelector, useAppDispatch} from '../../../hooks/hook';
import {fetchEvents} from '../../../features/allEvents/allEvent.slice';
import firestore from '@react-native-firebase/firestore';

type Props = {
  navigation: StackNavigationProp<TypeScreens, 'Home'>;
};

const Home: React.FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const allEvents = async () => {
      const allEventData = await firestore().collection('Events').get();
      const eventData = allEventData.docs.map(eventItems => {
        return eventItems.data();
      });
      dispatch(fetchEvents(eventData));
    };
    allEvents();
  }, [dispatch]);
  //* fetch all event state
  const allEvent = useAppSelector(state => state.allEventSlice);

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
  const flexGrow = StyleSheet.create({
    center: {
      flexGrow: allEvent.allEvents.length === 0 ? 1 : 0,
    },
  });
  return (
    <>
      <SafeAreaView style={styles.sectionContainer}>
        <ScrollView
          contentContainerStyle={[styles.scrollViewContent, flexGrow.center]}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <View style={styles.container}>
            {allEvent.allEvents.length === 0 ? (
              <View style={styles.loadingContainer}>
                <MaterialIndicator color="#8ac3ee" />
              </View>
            ) : (
              <>
                <View
                  style={{
                    marginTop: 10,
                  }}></View>
                <EventContainer />
              </>
            )}
            {/* Rest of the code */}
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
    // backgroundColor: '#8ac3ee',
    backgroundColor: '#fff',
    height: '100%',
  },
  scrollViewContent: {
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    paddingHorizontal: 25,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
