import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
const Actions = () => {
  const [showOptions, setShowOptions] = useState(false);
  const toggleOption = () => {
    setShowOptions(!showOptions);
  };
  return (
    <>
      <View style={style.actions}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            width: 60,
          }}>
          <TouchableOpacity onPress={toggleOption}>
            <Text
              style={{
                marginTop: '-8%',
                fontSize: 45,
                color: '#8ac3ee',
                fontWeight: '300',
                // rotation: showOptions ? '45' : 0,
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showOptions && (
        <View
          style={{
            position: 'absolute',
            bottom: 120,
            right: 25,
            justifyContent: 'space-between',
            height: '15%',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: 40,
              backgroundColor: '#fff',
              borderRadius: 100,
              elevation: 20,
            }}>
            <Image
              source={require('../../../assets/confetti.png')}
              style={{width: '50%', height: '50%', tintColor: '#8ac3ee'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: 40,
              backgroundColor: '#fff',
              borderRadius: 100,
              elevation: 20,
            }}>
            <Image
              source={require('../../../assets/addUser.png')}
              style={{width: '50%', height: '50%', tintColor: '#8ac3ee'}}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Actions;

const style = StyleSheet.create({
  actions: {
    position: 'absolute',
    bottom: 40,
    right: 15,
    width: 60,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 100,
    // elevation: 15,
  },
});
