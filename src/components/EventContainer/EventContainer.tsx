import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EventContainer = () => {
  return (
    <View>
      <View style={[styles.card, styles.elevation]}>
        <View>
          <Text style={styles.heading}>Redux Core</Text>
          
        </View>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{' '}
        </Text>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Text>11 : 00 PM</Text>
          <Text> - </Text>
          <Text>02 : 00 AM</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>13-Aug-23</Text>
          <Text> to </Text>
          <Text>14-Aug-23</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#BAA743',
              borderRadius: 50,
              marginVertical: 15,
              position: 'relative',
              // borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>L</Text>
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#6C63FF',
              borderRadius: 50,
              marginVertical: 15,
              position: 'absolute',
              left: 15,
              // borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#FFF',
              borderRadius: 50,
              marginVertical: 15,
              position: 'absolute',
              left: 30,
              // borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#F00',
              borderRadius: 50,
              marginVertical: 15,
              position: 'absolute',
              left: 45,
              // borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#65CD63',
              borderRadius: 50,
              marginVertical: 15,
              position: 'absolute',
              left: 60,
              // borderWidth: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
        </View>
      </View>
    </View>
  );
};

export default EventContainer;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#00080',
  },
});
