import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
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
import {StackNavigationProp} from '@react-navigation/stack';
import {TypeScreens} from '../../types/generics/TypeScreens';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

// const task = reference.putFile(pathToFile);
// task.on('state_changed', taskSnapshot => {
//   console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
// });

// task.then(() => {
//   console.log('Image uploaded to the bucket!');
// });

type Props = {
  navigation: StackNavigationProp<TypeScreens, 'CreateParticipant'>;
};

const CreateParticipant: React.FC<Props> = ({navigation}) => {
  // const Ref = storage().ref(`default/image/$default_avarta.png`);
  // const defaultImage = await Ref.getDownloadURL();
  const uploadIcon = require('../../../assets/cloudUpload.png');
  const defaultImage = require('../../../assets/default.png');
  const initialValues: participantType = {
    user_id: '',
    name: '',
    email: '',
    phone: '',
    avarta: '',
  };
  const [selectedImage, setSelectedImage] = useState<{path: string} | {}>({});
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
      .min(6)
      // .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
      .required('Phone number is required'),
    // avarta: yup.string().required('Upload your avarta'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createParticipantSchema}
      onSubmit={async (
        {avarta, user_id, name, email, phone},
        {setSubmitting},
      ) => {
        try {
          user_id = uuid.v4();
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

            const memberCollection = firestore().collection('Members');
            memberCollection.add(memberData).then(() => {
              console.warn('Member successfully add to cloud');
            });
            setSubmitting(false);
            navigation.navigate('Home'); // Redirect to the home screen
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
            const memberCollection = firestore().collection('Members');
            memberCollection.add(memberData).then(() => {
              console.warn('Member successfully add to cloud');
            });
            setSubmitting(false);
            navigation.navigate('Home'); // Redirect to the home screen
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
                          source={defaultImage}
                          style={{
                            width: '100%',
                            height: 180,
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
                            height: 180,
                            borderRadius: 15,
                            resizeMode: 'cover',
                          }}
                        />
                      </View>
                    )}
                    {/* {Object.keys(selectedImage).length === 0 && (
                      <Text
                        style={{fontSize: 15, color: 'red', paddingTop: 10}}>
                        {errors.avarta}
                      </Text>
                    )} */}

                    <DefaultButton
                      btnText="Add Member"
                      handleSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      styleBtn={[
                        {
                          marginTop: 45,
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

export default CreateParticipant;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  card: {
    height: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    paddingBottom: 40,
    paddingTop: 30,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 30,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#00080',
  },
});
