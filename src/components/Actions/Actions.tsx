import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

interface Props {
  showCreateEvent: (navigation: any) => void;
  showCreateParticipant: (navigation: any) => void;
}
const Actions: React.FC<Props> = ({showCreateEvent, showCreateParticipant}) => {
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
          <TouchableOpacity
            onPress={toggleOption}
            style={[style.btn, showOptions ? style.trans : null]}>
            <Image
              source={require('../../../assets/plus.png')}
              style={style.btnPlus}
            />
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
            }}
            onPress={showCreateEvent}>
            <Image
              source={require('../../../assets/confetti.png')}
              style={style.img}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showCreateParticipant}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: 40,
              backgroundColor: '#fff',
              elevation: 20,
              borderRadius: 100,
            }}>
            <Image
              source={require('../../../assets/addUser.png')}
              style={style.img}
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
  btnPlus: {width: '45%', height: '45%', tintColor: '#8ac3ee'},
  btn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '50%',
    height: '50%',
    tintColor: '#8ac3ee',
  },
  trans: {
    transform: [{rotate: '45deg'}],
  },
});
