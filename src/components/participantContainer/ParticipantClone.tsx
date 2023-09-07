import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import {fetchMembers} from '../../features/allMembers/allMember.slice';
// import {WaveIndicator} from 'react-native-indicators';
const ParticipantClone = ({touch}: any) => {
  const dispatch = useAppDispatch();

  //* fetch all member state
  const allMember = useAppSelector(state => state.allMemberSlice);

  //! create member state
  const createParticipant = useAppSelector(state => state.createMemberSlice);

  //? edit member state
  const editMember = useAppSelector(state => state.editParticipantSlice.data);

  //  delete member state
  const deleteMembers = useAppSelector(
    state => state.deleteParticipantSlice.deleteParticipant,
  );

  const {createdMember} = createParticipant;
  const {allMembers} = allMember;

  //! Read operation from Member collection
  useEffect(() => {
    const allParticipants = async () => {
      const allMemberData = await firestore().collection('Members').get();
      const memberData = allMemberData.docs.map(items => {
        return items.data();
      });
      dispatch(fetchMembers(memberData));
    };
    allParticipants();
  }, [dispatch, createdMember, editMember, deleteMembers]);

  const members = allMembers?.map(member => {
    return (
      <>
        <View
          key={member.user_id.toString()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 5,
            position: 'relative',
            borderBottomWidth: 0.5,
            paddingBottom: 10,
          }}>
          <TouchableOpacity onPress={() => touch(member.user_id.toString())}>
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
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: member.avarta}}
                  style={{width: '100%', height: '100%', borderRadius: 50}}
                  // onLoad={toggleState}
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 18}}>{member.name}</Text>
                <Text style={{fontSize: 16}}>{member.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  });

  return <>{members}</>;
};

export default ParticipantClone;

const styles = StyleSheet.create({
  headingAvarta: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
