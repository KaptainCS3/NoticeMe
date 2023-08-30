import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import {addMember} from '../../features/memberSlice/member.slice';
import EditCreateParticipant from '../editCreateParticipant/EditCreateParticipant';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const ParticipantContainer = () => {
  const dispatch = useAppDispatch();
  const memberData = useAppSelector(state => state.memberSlice);
  const {data, loading, error} = memberData;
  const [showOptions, setShowOptions] = useState<Boolean>(false);
  const [memberDelete, setMemberDelete] = useState<Boolean>(false);
  const [memberUpdate, setMemberUpdate] = useState<Boolean>(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [edit, setEdit] = useState(null);

  //! Read operation from Member collection
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
  }, [addMember, dispatch]);

  //! Delete operation from Member collection
  const handleDelete = async (documentId: string) => {
    try {
      setMemberDelete(true);
      await firestore().collection('Members').doc(documentId).delete();
      console.log('Document deleted successfully!', documentId);
      setMemberDelete(false);
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  };

  //! Update operation from Member collection
  const handleUpdate = (documentId: string, data: any) => {
    if (data.user_id === documentId) {
      setSelectedMember(documentId);
      setEdit(data);
      setMemberUpdate(!memberUpdate);
      console.log('Document clicked successfully!', documentId, data);
    } else console.log('not this document');
  };
  const confirmUpdate = async (documentId, data) => {
    try {
      setMemberDelete(true);
      await firestore().collection('Members').doc(documentId).update(data);
      // console.log('Document updated successfully!', documentId, data);
      console.log(data);
      setMemberDelete(false);
      setMemberUpdate(false);
    } catch (error) {
      console.log('Error updating document:', error);
    }
  };

  const members = data?.map(member => {
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
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  handleUpdate(member.user_id.toLocaleString(), member)
                }>
                <Text style={{marginRight: 8}}>
                  <FontAwesome5 name="pen" color={'#fff'} size={25} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(member.user_id.toString())}>
                <Text style={{marginLeft: 8}}>
                  <FontAwesome5 name="trash" color={'#fff'} size={25} />
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
          {showOptions && (
            <View
              style={{
                // paddingVertical: 40,
                paddingHorizontal: 15,
                backgroundColor: '#fff',
                width: '25%',
                height: 100,
                position: 'absolute',
                right: -24,
                top: -10,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}></View>
          )}
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
