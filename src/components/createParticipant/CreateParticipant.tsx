import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import DefaultButton from '../button/default-button/DefaultButton';
import {addMember} from '../../features/memberSlice/member.slice';
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import {Formik} from 'formik';
import * as yup from 'yup';
import participantType from '../../types/participantType/participantType';
// import ImagePicker from 'react-native-image-crop-picker';

interface Props {
  memberText: string;
}

const CreateParticipant = ({memberText}: Props) => {
  // const []
  // const uploadIcon = ;
  const initialValues: participantType = {
    name: '',
    email: '',
    phone: '',
    avarta: '',
  };
  const dispatch = useAppDispatch();
  const memberData = useAppSelector(state => state.memberSlice);

  //! upload handler
  const uplodadHandler = async () => {
    try {
      // const image = await ImagePicker.openPicker({
      //   width: 400,
      //   height: 400,
      //   cropping: false,
      // });

      // setSelectedImage(image);
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };
  const {data, loading, error} = memberData;
  const createParticipantSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('name is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
    phone: yup
      .string()
      .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
      .required('Phone number is required'),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createParticipantSchema}
      onSubmit={values => {
        Alert.alert(JSON.stringify(values));
        dispatch(addMember(values));
      }}>
      {({
        handleChange,
        setFieldTouched,
        handleSubmit,
        values,
        errors,
        isSubmitting,
      }) => (
        <>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View>
              <View
                style={{
                  height: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 24,
                  }}>
                  {memberText}
                </Text>
              </View>
              <View>
                <View style={[styles.card, styles.elevation]}>
                  {/* Name input field */}
                  <Text style={{marginBottom: 8}}>Name</Text>
                  <TextInput
                    placeholder="name"
                    keyboardType="default"
                    style={{
                      padding: 10,
                      borderColor: '#999',
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingLeft: 16,
                    }}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    value={values.name}
                  />

                  {errors.name && (
                    <Text style={{fontSize: 15, color: 'red', paddingTop: 5}}>
                      {errors.name}
                    </Text>
                  )}
                  {/* Email input field */}
                  <Text style={{marginVertical: 10}}>Email</Text>
                  <TextInput
                    placeholder="email"
                    keyboardType="email-address"
                    style={{
                      padding: 10,
                      borderColor: '#999',
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingLeft: 16,
                    }}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    value={values.email}
                  />

                  {errors.email && (
                    <Text style={{fontSize: 15, color: 'red', paddingTop: 5}}>
                      {errors.email}
                    </Text>
                  )}

                  {/* Phone input field*/}
                  <Text style={{marginVertical: 10}}>Phone</Text>
                  <TextInput
                    placeholder="phone"
                    keyboardType="phone-pad"
                    style={{
                      padding: 10,
                      borderColor: '#999',
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingLeft: 16,
                    }}
                    onChangeText={handleChange('phone')}
                    onBlur={() => setFieldTouched('phone')}
                    value={values.phone}
                  />

                  {errors.phone && (
                    <Text style={{fontSize: 15, color: 'red', paddingTop: 5}}>
                      {errors.phone}
                    </Text>
                  )}

                  <TouchableOpacity
                    style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={{marginVertical: 10, paddingRight: 10}}>
                      Avarta
                    </Text>
                    {/* <Image
                      source={uploadIcon}
                      style={{width: 50, height: 50}}
                    /> */}
                  </TouchableOpacity>
                  <View
                    style={{
                      // padding: 10,
                      paddingVertical: 45,
                      borderColor: '#999',
                      borderWidth: 1,
                      borderRadius: 10,
                      paddingLeft: 16,
                    }}></View>
                  <DefaultButton
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </>
      )}
    </Formik>
  );
};

export default CreateParticipant;

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
    shadowColor: '#00080',
  },
});
