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
interface Props {
  text: string;
}

const User = ({text}: Props) => {
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
            <View style={{marginTop: 10}}>
              <View style={styles.border}>
                <Text style={{width: '25%'}}>name</Text>
                <Text style={{width: '70%'}}>@leonardDev</Text>
              </View>
              <View style={styles.border}>
                <Text style={{width: '25%'}}>email</Text>
                <Text style={{width: '70%'}}>kaptaincs3dev@gmail.com</Text>
              </View>
              <View style={styles.border}>
                <Text style={{width: '25%'}}>password</Text>
                <Text style={{width: '70%'}}>**************</Text>
              </View>
              <View style={styles.border}>
                <Text style={{width: '25%'}}>phone</Text>
                <Text style={{width: '70%'}}>+23768****177</Text>
              </View>
              <View style={styles.border}>
                <Text>logout</Text>
                <Text></Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default User;

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
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: '#999',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  gap: {},
});
