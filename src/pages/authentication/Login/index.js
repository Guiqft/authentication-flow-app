import React, { Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';

import * as SecureStore from 'expo-secure-store';

//import custom components
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import ErrorMessage from '../../../components/ErrorMessage';

import { getToken } from '../../../auth';

//to validate the inputs and show error messages
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(8, 'Password must have at least 8 characters ')
})

export default class Login extends React.Component {
  goToSignup = () => this.props.navigation.navigate('Signup');

  render() {
    //this function manage what happens when user submit the form
    // handleSubmit = async values => {
    //   console.log()
    //   const response = await getToken(values.email, values.password);

    //   //console.log(response);
    //   // if (response.status === 200) {
    //   //   const token = await response.json();

    //   //   console.log(token);
    //   //   //localStorage.setItem('Authorization', token.authorization);
    //   //   //window.location.href = '/';
    //   // }

    //   //else return response.status(401);

    //   return true;
    // }

    // handleSubmit = (data) => {
    //   if (data.email > 0 && data.password > 0) {
    //     this.props.navigation.navigate('Signup')
    //   }
    // };
    

    return (
      <View style={styles.container}>
        <Formik
          initialValues = {{email: '', password: ''}}
          validationSchema={validationSchema}

          //'data' gives acess and change the 'initialValues'
          onSubmit={ async (data, { setSubmitting }) => {
            setSubmitting(true);

            //getting the acess token
            const response = await getToken(data);

            //if everything is fine
            if (response.status === 200) {
              const token = await response.data;

              //then save the token in local storage
              //SecureStore.setItemAsync("authorization", token.acess_token);
            } else return response.status(401);
            setSubmitting(false);
          }}
        >
          {formikProps => (
            <Fragment>
              <FormInput
                name='email'
                value={formikProps.email}
                onChangeText={formikProps.handleChange('email')}
                placeholder='Enter email'
                autoCapitalize='none'
                iconName='ios-mail'
                iconColor='#2C384A'
                onBlur={formikProps.handleBlur('email')}
              />

              {/* .touched make the error message show only for fields that already are visited*/}
              <ErrorMessage errorValue={formikProps.touched.email && formikProps.errors.email} /> 

              <FormInput
                name='password'
                value={formikProps.password}
                onChangeText={formikProps.handleChange('password')}
                placeholder='Enter password'
                secureTextEntry
                iconName='ios-lock'
                iconColor='#2C384A'
                onBlur={formikProps.handleBlur('password')}
              />
              <ErrorMessage errorValue={formikProps.touched.password && formikProps.errors.password} />

              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  title='LOGIN'
                  buttonColor='#039BE5'
                  onPress={formikProps.submitForm}
                  //this change the button color to grey if the fileds arent valids or to waiting the auth server response
                  disabled={!formikProps.isValid || formikProps.isSubmitting}  />
              </View>
            </Fragment>
          )}
        </Formik>
         
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{ color: '#F57C00' }}
          type='clear'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 25
  }
})