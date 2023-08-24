import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import DefaultButton from '../button/default-button/DefaultButton';
import {createEvent} from '../../features/eventSlice/event.slice';
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import eventType from '../../types/eventType/eventType';
import {Formik} from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import ParticipantContainer from '../participantContainer/ParticipantContainer';
interface Props {
  eventText: string;
}

const initialValues: eventType = {
  title: '',
  description: '',
  startTime: '',
  endTime: '',
  startDate: new Date(),
  endDate: new Date(),
};
const CreateEvent = ({eventText}: Props) => {
  const [startTime, setStartTime] = useState(new Date());
  const [openStartTime, setOpenStartTime] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [openEndTime, setOpenEndTime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [openStartDate, setOpenStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [openEndDate, setOpenEndDate] = useState(false);
  const [showList, setShowList] = useState(false);

  const createEventSchema = yup.object().shape({
    title: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('name is required'),
    description: yup.string().min(15).required('description is required'),
  });
  const dispatch = useAppDispatch();
  const eventData = useAppSelector(state => state.eventSlice);
  const {loading, error, data} = eventData;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createEventSchema}
      onSubmit={values => {
        Alert.alert(JSON.stringify(values));
        dispatch(createEvent(values));
      }}>
      {({handleChange, handleSubmit, values, errors, setFieldTouched}) => (
        <>
          <View style={styles.container}>
            <View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    //   fontStyle: 'italic',
                    fontFamily: 'Poppins',
                  }}>
                  {eventText}
                  {/* <Text style={{color: '#1E319D'}}> */}
                  {/* </Text> */}
                </Text>
              </View>
              <View>
                <View style={[styles.card, styles.elevation]}>
                  {/* Title input field */}
                  <Text style={{marginBottom: 8}}>Title</Text>
                  <TextInput
                    placeholder="title"
                    keyboardType="default"
                    onChangeText={handleChange('title')}
                    onBlur={() => setFieldTouched('title')}
                    value={values.title}
                    style={{
                      padding: 10,
                      borderColor: '#999',
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingLeft: 16,
                    }}
                  />

                  {errors.title && (
                    <Text style={{fontSize: 15, color: 'red', paddingTop: 5}}>
                      {errors.title}
                    </Text>
                  )}

                  {/* Description input field */}
                  <Text style={{marginVertical: 10}}>Description</Text>
                  <TextInput
                    placeholder="description"
                    keyboardType="default"
                    onChangeText={handleChange('description')}
                    onBlur={() => setFieldTouched('description')}
                    value={values.description}
                    multiline={true} // Set multiline prop to true
                    // numberOfLines={1}
                    style={{
                      // paddingBottom: 40,
                      borderColor: '#999',
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingLeft: 16,
                      overflow: 'scroll',
                    }}
                  />

                  {errors.description && (
                    <Text style={{fontSize: 15, color: 'red', paddingTop: 5}}>
                      {errors.description}
                    </Text>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 12,
                    }}>
                    {/* StartTime input field*/}
                    <View style={{width: '45%'}}>
                      <TouchableOpacity
                        onPress={() => setOpenStartTime(true)}
                        style={{
                          // padding: 10,
                          borderColor: '#999',
                          borderWidth: 1,
                          borderRadius: 10,
                          paddingLeft: 16,
                        }}>
                        <DatePicker
                          modal
                          open={openStartTime}
                          mode="time"
                          date={startTime}
                          onConfirm={date => {
                            setOpenStartTime(false);
                            setStartTime(date);
                          }}
                          onCancel={() => setOpenStartTime(false)}
                          timeZoneOffsetInMinutes={0}
                        />
                        <Text style={{marginVertical: 15}}>Start Time</Text>
                      </TouchableOpacity>
                      <Text></Text>
                      {/* EndTime input field  style={{marginVertical: 15}}*/}

                      <TouchableOpacity
                        onPress={() => setOpenEndTime(true)}
                        style={{
                          // padding: 10,
                          borderColor: '#999',
                          borderWidth: 1,
                          borderRadius: 10,
                          paddingLeft: 16,
                        }}>
                        <DatePicker
                          modal
                          mode="time"
                          open={openEndTime}
                          date={endTime}
                          onConfirm={date => {
                            setOpenEndTime(false);
                            setEndTime(date);
                          }}
                          onCancel={() => setOpenEndTime(false)}
                          timeZoneOffsetInMinutes={0}
                        />
                        <Text style={{marginVertical: 15}}>End Time</Text>
                      </TouchableOpacity>
                      <Text></Text>
                    </View>
                    <View style={{width: '45%'}}>
                      <TouchableOpacity
                        onPress={() => setOpenStartDate(true)}
                        style={{
                          // padding: 10,
                          borderColor: '#999',
                          borderWidth: 1,
                          borderRadius: 10,
                          paddingLeft: 16,
                        }}>
                        <DatePicker
                          modal
                          mode="date"
                          open={openStartDate}
                          date={startDate}
                          onConfirm={date => {
                            setOpenStartDate(false);
                            setStartDate(date);
                          }}
                          onCancel={() => {
                            setOpenStartDate(false);
                          }}
                        />
                        <Text style={{marginVertical: 15}}>Start Date</Text>
                      </TouchableOpacity>
                      {/* style={{marginVertical: 15}} */}
                      <Text></Text>
                      <TouchableOpacity
                        onPress={() => setOpenEndDate(true)}
                        style={{
                          // padding: 10,
                          borderColor: '#999',
                          borderWidth: 1,
                          borderRadius: 10,
                          paddingLeft: 16,
                        }}>
                        <DatePicker
                          modal
                          mode="date"
                          open={openEndDate}
                          date={endDate}
                          onConfirm={date => {
                            setOpenEndDate(false);
                            setEndDate(date);
                          }}
                          onCancel={() => {
                            setOpenEndDate(false);
                          }}
                        />
                        <Text style={{marginVertical: 15}}>End Date</Text>
                      </TouchableOpacity>
                      <Text></Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => setShowList(true)}
                    style={{
                      padding: 15,
                      borderColor: '#999',
                      borderWidth: 1,
                      borderRadius: 10,
                      alignItems: 'center',
                      marginVertical: 15,
                    }}>
                    <Text>Add Participants</Text>
                  </TouchableOpacity>
                  {showList && (
                    <View>
                      <ParticipantContainer />
                      <ParticipantContainer />
                    </View>
                  )}
                  <View style={{marginTop: 25}}>
                    <DefaultButton handleSubmit={handleSubmit} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // paddingHorizontal: 25,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    height: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingBottom: 90,
    paddingTop: 30,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#00020',
  },
});
