import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useAppSelector, useAppDispatch} from '../../hooks/hook';
import firestore from '@react-native-firebase/firestore';
import {fetchEvents} from '../../features/allEvents/allEvent.slice';
import {deleteEvent} from '../../features/deleteEventSlice/deleteEvent.slice';
import {fetchMembers} from '../../features/allMembers/allMember.slice';
import EditCreateEvent from '../editCreateEvent/EditCreateEvent';
import eventType from '../../types/eventType/eventType';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const EventContainer = () => {
  const [eventUpdate, setEventUpdate] = useState<Boolean>(false);
  const [editEvents, setEditEvents] = useState([]);
  const [eventDelete, setEventDelete] = useState<Boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const allParticipants = async () => {
      const allMemberData = await firestore().collection('Members').get();
      const memberData = allMemberData.docs.map(items => {
        return items.data();
      });
      dispatch(fetchMembers(memberData));
    };
    allParticipants();
  }, [dispatch]);

  const allMembers = useAppSelector(state => state.allMemberSlice.allMembers);

  //* fetch all event state
  const allEvent = useAppSelector(state => state.allEventSlice);

  //! create event state
  const Event = useAppSelector(state => state.createEventSlice);

  // //? edit member state
  const editEventData = useAppSelector(state => state.editEventSlice.editEvent);

  //  delete member state
  const deleteEventData = useAppSelector(
    state => state.deleteEventSlice.deleteEvent,
  );

  const {allEvents} = allEvent;
  const {createdEvent} = Event;

  //! Read operation from Events collection
  useEffect(() => {
    const allEvents = async () => {
      const allEventData = await firestore().collection('Events').get();
      const eventData = allEventData.docs.map(eventItems => {
        return eventItems.data();
      });
      dispatch(fetchEvents(eventData));
    };
    allEvents();
  }, [dispatch, createdEvent, deleteEventData, editEventData]);

  //! Delete operation from Member collection
  const handleDelete = async (documentId: string, event: eventType) => {
    try {
      setEventDelete(true);
      if (event.eventId === documentId) {
        await firestore().collection('Events').doc(documentId).delete();
        dispatch(deleteEvent(event));
        console.log('Document deleted successfully!', documentId);
        setEventDelete(false);
      }
    } catch (error) {
      console.log('Error deleting document:', error);
    }
  };

  //! Update operation from Member collection

  const handleUpdate = (documentId: string, event: eventType) => {
    if (event.eventId === documentId) {
      setSelectedEvent(documentId);
      setEditEvents(event);
      setEventUpdate(!eventUpdate);
      // console.log('Document clicked successfully!', documentId, event);
    } else console.log('not this document');
  };

  //* confirm update function passed as props to edit component

  const confirmUpdate = async (documentId: string, event: []) => {
    try {
      setEventDelete(true);
      await firestore().collection('Events').doc(documentId).update(event);
      console.log('Document updated successfully!', documentId, event);
      console.log(event);
      setEventDelete(false);
      setEventUpdate(false);
    } catch (error) {
      console.log('Error updating document:', error);
    }
  };

  const events = allEvents.map(eventItem => {
    //! format start time
    const startTime = eventItem?.startTime.toDate();
    const formattedStartTime = startTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    //? format start date
    const startDate = eventItem?.startDate.toDate();
    const formattedStartDate = startDate.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
    });

    //* format end time
    const endTime = eventItem?.endTime.toDate();
    const formattedEndTime = endTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    // format end date
    const endDate = eventItem?.endDate.toDate();
    const formattedEndDate = endDate.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
    });

    return (
      <View>
        <View style={[styles.card, styles.elevation]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.heading}>{eventItem.title}</Text>
            <View>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() =>
                    handleUpdate(eventItem.eventId.toLocaleString(), eventItem)
                  }>
                  <Text style={{marginRight: 8}}>
                    <FontAwesome5 name="pen" color={'#000'} size={25} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    handleDelete(eventItem.eventId.toString(), eventItem)
                  }>
                  <Text style={{marginLeft: 8}}>
                    <FontAwesome5 name="trash" color={'#000'} size={25} />
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{fontStyle: 'italic'}}>{eventItem.description}</Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Text style={styles.bold}>{formattedStartTime}</Text>
            <Text> - </Text>
            <Text style={styles.bold}>{formattedEndTime}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.bold}>{formattedStartDate}</Text>
            <Text> to </Text>
            <Text style={styles.bold}>{formattedEndDate}</Text>
          </View>
          <View
            style={{
              // flexDirection: 'row',
              alignItems: 'center',
              position: 'relative',
              justifyContent: 'center',
              zIndex: 400,
              paddingVertical: 40,
              height: 60,
              // borderWidth: 1,
            }}>
            {allMembers.map((member, index) => {
              if (eventItem.participants.includes(member.user_id.toString())) {
                return (
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      marginVertical: 15,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: index === 0 ? 'relative' : 'absolute',
                      left: index === 0 ? 0 : (index - 1) * 15,
                    }}>
                    <Image
                      source={{uri: member?.avarta}}
                      style={{
                        width: '100%',
                        borderWidth: 1,
                        height: '100%',
                        borderRadius: 50,
                        borderColor: '#8ac3ee',
                      }}
                    />
                  </View>
                );
              }
            })}
          </View>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}></View>
          </View> */}
        </View>
      </View>
    );
  });
  return (
    <>
      {events}

      {eventUpdate && (
        <EditCreateEvent
          documentId={selectedEvent}
          editEvents={editEvents}
          confirmUpate={confirmUpdate}
        />
      )}
    </>
  );
};

export default EventContainer;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  bold: {
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
    // minWidth: 300,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#00080',
  },
});
