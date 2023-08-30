import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import DefaultButton from '../button/default-button/DefaultButton';
import {createEvent} from '../../features/eventSlice/event.slice';
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import eventType from '../../types/eventType/eventType';
import {Formik} from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import ParticipantContainer from '../participantContainer/ParticipantContainer';
import {StackNavigationProp} from '@react-navigation/stack';
import {TypeScreens} from '../../types/generics/TypeScreens';
import firestore from '@react-native-firebase/firestore'

type Props = {
  navigation: StackNavigationProp<TypeScreens, 'CreateEvent'>;
};

const initialValues: eventType = {
  title: '',
  description: '',
  startTime: '',
  endTime: '',
  startDate: '',
  endDate: '',
  participants: [],
};
const CreateEvent: React.FC<Props> = ({navigation}) => {
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
  console.log(data);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createEventSchema}
      onSubmit={({title, description, startDate, startTime, endDate, endTime, participants}, {setSubmitting}) => {
        
        navigation.navigate('Home');
      }}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        setFieldTouched,
        setFieldValue,
        touched,
        handleBlur,
      }) => (
        <>
          <SafeAreaView style={styles.sectionContainer}>
            <ScrollView>
              <View style={styles.container}>
                <View>
                  <View>
                    <View style={[styles.card, styles.elevation]}>
                      {/* Title input field */}
                      <Text style={{marginBottom: 8}}>Title</Text>
                      <TextInput
                        placeholder="title"
                        keyboardType="default"
                        onChangeText={handleChange('title')}
                        onBlur={() => handleBlur('title')}
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
                        <Text
                          style={{fontSize: 15, color: 'red', paddingTop: 5}}>
                          {errors.title}
                        </Text>
                      )}

                      {/* Description input field */}
                      <Text style={{marginVertical: 10}}>Description</Text>
                      <TextInput
                        placeholder="description"
                        keyboardType="default"
                        onChangeText={handleChange('description')}
                        onBlur={() => handleBlur('description')}
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
                        <Text
                          style={{fontSize: 15, color: 'red', paddingTop: 5}}>
                          {errors.description}
                        </Text>
                      )}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 15,
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
                              onConfirm={startTime => {
                                setOpenStartTime(false);
                                setStartTime(startTime);
                                setFieldValue('startTime', startTime);
                              }}
                              onCancel={() => setOpenStartTime(false)}
                              timeZoneOffsetInMinutes={0}
                              // value={values.startTime}
                            />
                            <Text style={{marginVertical: 15}}>Start Time</Text>
                          </TouchableOpacity>
                          <Text style={{padding: 8}}>
                            {values.startTime && startTime.toLocaleTimeString()}
                          </Text>

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
                              onConfirm={endTime => {
                                setEndTime(endTime);
                                setOpenEndTime(false);
                                setFieldValue('endTime', endTime);
                              }}
                              onCancel={() => setOpenEndTime(false)}
                              timeZoneOffsetInMinutes={0}
                            />
                            <Text style={{marginVertical: 15}}>End Time</Text>
                          </TouchableOpacity>
                          <Text style={{padding: 8}}>
                            {values.endTime && endTime.toLocaleTimeString()}
                          </Text>
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
                              onConfirm={startDate => {
                                setStartDate(startDate);
                                setFieldValue('startDate', startDate);
                                setOpenStartDate(false);
                              }}
                              onCancel={() => {
                                setOpenStartDate(false);
                              }}
                            />
                            <Text style={{marginVertical: 15}}>Start Date</Text>
                          </TouchableOpacity>
                          <Text style={{padding: 8}}>
                            {values.startDate && startDate.toDateString()}
                          </Text>

                          {/* StartDate input field  style={{marginVertical: 15}}*/}
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
                              onConfirm={endDate => {
                                setOpenEndDate(false);
                                setEndDate(endDate);
                                setFieldValue('endDate', endDate);
                              }}
                              onCancel={() => {
                                setOpenEndDate(false);
                              }}
                            />
                            <Text style={{marginVertical: 15}}>End Date</Text>
                          </TouchableOpacity>
                          <Text style={{padding: 8}}>
                            {values.endDate && endDate.toDateString()}
                          </Text>
                        </View>
                      </View>

                      {/* EndDate input field  style={{marginVertical: 15}}*/}
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
                        </View>
                      )}
                      <View style={{marginTop: 25}}>
                        <DefaultButton
                          btnText="Create Event"
                          handleSubmit={handleSubmit}
                          styleBtn={[
                            {
                              paddingVertical: 10,
                              borderRadius: 10,
                              backgroundColor: '#1E319D',
                            },
                            {
                              color: 'white',
                              fontSize: 18,
                              fontWeight: '500',
                              textAlign: 'center',
                            },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      )}
    </Formik>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  container: {
    width: '100%',
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
