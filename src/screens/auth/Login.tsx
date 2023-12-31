import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import Logo from '../../../assets/undraw_security_on_re_e491.svg';
import DefaultButton from '../../components/button/default-button/DefaultButton';
import {loginUser} from '../../features/loginSlice/login.slice';
import {useAppDispatch, useAppSelector} from '../../hooks/hook';
import {Formik} from 'formik';
import * as yup from 'yup';
import loginType from '../../types/loginType/loginType';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
const Login = () => {
  const dispatch = useAppDispatch();
  const loginData = useAppSelector(state => state.loginSlice);
  const initialValues: loginType = {
    email: '',
    password: '',
  };
  // const eye = require('../../../assets/eye.png');
  const hidden = require('../../../assets/hide.png');
  const {email, password} = loginData;
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const userLoginSchema = yup.object().shape({
    password: yup.string().min(4).required('password is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
  });
  console.log(email, password);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userLoginSchema}
      onSubmit={(values, {resetForm}) => {
        dispatch(loginUser(values));
        auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then(() => {
            console.log('User account created & signed in!');
            Alert.alert(JSON.stringify(values));
            Alert.alert('user login 🥳🎉🎉');
            resetForm({values: initialValues});
          })
          .catch(error => {
            console.error(error);
            Alert.alert('user is not login');
          });
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
          <View style={styles.container}>
            <View>
              <Logo width={240} height={200} />
            </View>
            <Text style={styles.heading}>Login</Text>
            <View>
              <View style={[styles.card, styles.elevation]}>
                {/* Email input field */}
                <Text style={{marginBottom: 8}}>Email</Text>
                <TextInput
                  placeholder="email"
                  style={{
                    padding: 5,
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

                {/* Password input field */}
                <Text style={{marginVertical: 8}}>Password</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 10,
                    borderColor: '#999',
                    width: '100%',
                    borderWidth: 1,
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    placeholder="password"
                    secureTextEntry={showPassword ? false : true}
                    style={{
                      padding: 5,
                      width: '80%',
                      paddingLeft: 16,
                    }}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                    value={values.password}
                  />
                  <View
                    style={{
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Icon name="eye-off" size={24} color="#000" />
                      ) : (
                        <Icon name="eye" size={24} color="#000" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.password && (
                  <Text style={{fontSize: 15, color: 'red', paddingTop: 5}}>
                    {errors.password}
                  </Text>
                )}
                <DefaultButton
                  btnText="Login"
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </View>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 25,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 13,
    marginLeft: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingBottom: 75,
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
