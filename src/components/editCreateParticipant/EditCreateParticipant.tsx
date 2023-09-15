import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import DefaultButton from '../button/default-button/DefaultButton';
import {Formik} from 'formik';
import * as yup from 'yup';
import participantType from '../../types/participantType/participantType';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import {useAppDispatch} from '../../hooks/hook';
import storage from '@react-native-firebase/storage';
import {editParticipant} from '../../features/editParticipantSlice/editParticipant.slice';
// const task = reference.putFile(pathToFile);
// task.on('state_changed', taskSnapshot => {
//   console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
// });

// task.then(() => {
//   console.log('Image uploaded to the bucket!');
// });
const EditCreateParticipant = ({documentId, edit, confirmUpate}: any) => {
  const uploadIcon = require('../../../assets/cloudUpload.png');

  const defaultImage = require('../../../assets/default.png');
  console.log(edit.avarta);

  const initialValues: participantType = {
    user_id: edit.user_id,
    name: edit.name,
    email: edit.email,
    phone: edit.phone,
    avarta: '',
  };
  const [selectedImage, setSelectedImage] = useState<{path: string} | {}>({});
  const dispatch = useAppDispatch();

  //! upload handler
  const uplodadHandler = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: false,
      });

      setSelectedImage(image);
    } catch (error) {
      console.log('Image upload failed:', error);
    }
  };

  const EditCreateParticipantSchema = yup.object().shape({
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
      .min(6)
      // .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
      .required('Phone number is required'),
    // avarta: yup.string().required('Upload your avarta'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EditCreateParticipantSchema}
      //! Write operation to Collection
      onSubmit={async (
        {avarta, user_id, name, email, phone},
        {setSubmitting},
      ) => {
        try {
          // user_id = uuid.v4().toString();
          avarta =
            selectedImage && 'path' in selectedImage
              ? `${uuid.v4()}${selectedImage.path.slice(70)}`
              : defaultImage;

          if (avarta) {
            let avartaUrl = '';
            const storageRef = storage().ref(`avarta/images/${avarta}`);
            await storageRef.putFile(selectedImage.path);
            avartaUrl = await storageRef.getDownloadURL();
            const memberData = {
              user_id,
              name,
              phone,
              email,
              avarta: avartaUrl,
            };
            dispatch(editParticipant(memberData));
            confirmUpate(documentId, memberData);
            setSubmitting(false);
          } else {
            let avartaUrl = '';
            const storageRef = storage().ref(
              `default/image/default_avarta.png`,
            );
            avartaUrl = await storageRef.getDownloadURL();
            const memberData = {
              user_id,
              name,
              phone,
              email,
              avarta: avartaUrl,
            };
          }
        } catch (error) {
          console.error(`Error occurred ${error}`);
        }
      }}>
      {({
        handleChange,
        setFieldTouched,
        handleSubmit,
        values,
        errors,
        isSubmitting,
        handleBlur,
      }) => (
        <>
          {/* contentContainerStyle={{height: '100%'}} */}
          <SafeAreaView style={styles.sectionContainer}>
            <ScrollView>
              {/* style={styles.container} */}
              <View>
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
                      onBlur={() => handleBlur('name')}
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
                      onBlur={() => handleBlur('email')}
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
                      onBlur={() => handleBlur('phone')}
                      value={values.phone}
                    />

                    {errors.phone && (
                      <Text style={{fontSize: 15, color: 'red', paddingTop: 5}}>
                        {errors.phone}
                      </Text>
                    )}

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginVertical: 10,
                      }}
                      onPress={uplodadHandler}>
                      <Text style={{marginVertical: 15, paddingRight: 10}}>
                        Upload Avarta
                      </Text>
                      <Image
                        source={uploadIcon}
                        style={{width: 50, height: 50}}
                      />
                    </TouchableOpacity>
                    {!selectedImage || !('path' in selectedImage) ? (
                      <View>
                        <Image
                          source={{uri: edit.avarta}}
                          style={{
                            width: '100%',
                            height: 150,
                            borderRadius: 15,
                            resizeMode: 'cover',
                          }}
                        />
                      </View>
                    ) : (
                      <View>
                        <Image
                          source={{uri: (selectedImage as {path: string}).path}}
                          style={{
                            width: '100%',
                            height: 150,
                            borderRadius: 15,
                            resizeMode: 'cover',
                          }}
                        />
                      </View>
                    )}

                    <DefaultButton
                      btnText="Update Member"
                      handleSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      styleBtn={[
                        {
                          marginTop: 25,
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
            </ScrollView>
          </SafeAreaView>
        </>
      )}
    </Formik>
  );
};

export default EditCreateParticipant;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  card: {
    // height: '100%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 15,
    paddingBottom: 40,
    paddingTop: 30,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 30,
  },
  elevation: {
    // elevation: 20,
    // shadowColor: '#00080',
  },
});
