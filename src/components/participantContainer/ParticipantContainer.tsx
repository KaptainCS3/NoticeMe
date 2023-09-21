import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import {fetchMembers} from '../../features/allMembers/allMember.slice';
import EditCreateParticipant from '../editCreateParticipant/EditCreateParticipant';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {deleteMember} from '../../features/deleteParticipantSlice/deleteParticipant.slice';
import participantType from '../../types/participantType/participantType';
import {
  // BallIndicator,
  // BarIndicator,
  // DotIndicator,
  // MaterialIndicator,
  // PacmanIndicator,
  // PulseIndicator,
  // SkypeIndicator,
  // UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
const ParticipantContainer = () => {
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
  const [showOptions, setShowOptions] = useState<Boolean>(true);
  const [memberDelete, setMemberDelete] = useState<Boolean>(false);
  const [memberUpdate, setMemberUpdate] = useState<Boolean>(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [edit, setEdit] = useState([]);

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

  const toggleState = () => {
    setShowOptions(false);
  };
  //! Delete operation from Member collection
  const handleDelete = async (documentId: string, data: participantType) => {
    try {
      setMemberDelete(true);
      if (data.user_id === documentId) {
        await firestore().collection('Members').doc(documentId).delete();
        dispatch(deleteMember(data));
        console.log('Document deleted successfully!', documentId);
        setMemberDelete(false);
      }
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  };

  //! Update operation from Member collection

  const handleUpdate = (documentId: string, data: participantType) => {
    if (data.user_id === documentId) {
      setSelectedMember(documentId);
      setEdit(data);
      setMemberUpdate(!memberUpdate);
      console.log('Document clicked successfully!', documentId, data);
    } else console.log('not this document');
  };

  //* confirm update function passed as props to edit component

  const confirmUpdate = async (documentId: string, data: []) => {
    try {
      setMemberDelete(true);
      await firestore().collection('Members').doc(documentId).update(data);
      console.log(data);
      setMemberDelete(false);
      setMemberUpdate(false);
    } catch (error) {
      console.log('Error updating document:', error);
    }
  };

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
            paddingBottom: 12,
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
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {showOptions && (
                <View style={{width: '100%', height: '100%'}}>
                  <WaveIndicator color="#8ac3ee" />
                </View>
              )}
              <Image
                source={{uri: member.avarta}}
                style={{width: '100%', height: '100%', borderRadius: 50}}
                onLoad={toggleState}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 18}}>{member.name}</Text>
              <Text style={{fontSize: 16}}>{member.email}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  handleUpdate(member.user_id.toLocaleString(), member)
                }>
                <Text style={{marginRight: 8}}>
                  <FontAwesome5 name="pen" color={'#000'} size={25} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(member.user_id.toString(), member)}>
                <Text style={{marginLeft: 8}}>
                  <FontAwesome5 name="trash" color={'#000'} size={25} />
                </Text>
              </TouchableOpacity>
              {/* <View
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
                }}></View> */}
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  });

  return (
    <>
      {members}
      {memberUpdate && (
        <EditCreateParticipant
          documentId={selectedMember}
          edit={edit}
          confirmUpate={confirmUpdate}
        />
      )}
    </>
  );
};

export default ParticipantContainer;

const styles = StyleSheet.create({
  headingAvarta: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
