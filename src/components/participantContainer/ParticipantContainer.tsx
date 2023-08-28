import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import {addMember} from '../../features/memberSlice/member.slice';
const ParticipantContainer = () => {
  const dispatch = useAppDispatch();
  const memberData = useAppSelector(state => state.memberSlice);
  const {data, loading, error} = memberData;

  useEffect(() => {
    const allParticipants = async () => {
      const member = await firestore().collection('Members').get();
      const memberData = member.docs.map(items => {
        console.warn(items.data());
        return items.data();
      });
      dispatch(addMember(memberData));
    };
    allParticipants();
  }, [addMember]);

  const members = data?.map(member => {
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
                // backgroundColor: '#f99',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: member.avarta}}
                style={{width: '100%', height: '100%', borderRadius: 50}}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text>{member.name}</Text>
              <Text>{member.email}</Text>
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
  });

  return <>{members}</>;
};

export default ParticipantContainer;

const styles = StyleSheet.create({
  headingAvarta: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
