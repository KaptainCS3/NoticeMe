import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const ParticipantContainer = () => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#f99',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.headingAvarta}>l a</Text>
          </View>
          <View style={{marginLeft: 10}}>
            <Text>leonard applegryn</Text>
            <Text>kaptaincs3dev@gmail.com</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: '#000',
              borderRadius: 50,
            }}></View>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: '#000',
              borderRadius: 50,
              marginVertical: 2,
            }}></View>
          <View
            style={{
              width: 5,
              height: 5,
              backgroundColor: '#000',
              borderRadius: 50,
            }}></View>
        </View>
      </View>
    </>
  );
};

export default ParticipantContainer;

const styles = StyleSheet.create({
  headingAvarta: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
});
