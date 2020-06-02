import React, { Fragment, useContext, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../../../components/Context';

import styles from './styles';

//import custom components
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import ErrorMessage from '../../../components/ErrorMessage';

//to validate inputs and show error messages
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

const Login = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  const [ loginError, setLoginError ] = useState(false);

  return (
    <View style={styles.container}>
      <Formik
        initialValues = {{email: '', password: ''}}
        validationSchema={validationSchema}

        //'data' gives acess to 'initialValues'
        onSubmit = { async (data) => {
          var statusCode;
          //calling the sigIn from our context, passing form inputs as parameter
          statusCode = await signIn(data.email, data.password);
          if (statusCode === 401) setLoginError(true);
          else if (statusCode === 200) setLoginError(false);
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

            { loginError === true ? (
              <ErrorMessage errorValue="Wrong e-mail or password. Try again."/>) : (
              <View />)
            }
            
            <View style={styles.buttonContainer}>
              <FormButton
                buttonType='outline'
                title='LOGIN'
                buttonColor='#039BE5'
                onPress={formikProps.submitForm}
                //this change the button color to grey if the fileds arent valids or to waiting the auth server response
                disabled={!formikProps.isValid}/>
            </View>
          </Fragment>
        )}
      </Formik>
        
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => {navigation.navigate('Signup')}}
        titleStyle={{ color: '#F57C00' }}
        type='clear'
      />
    </View>
   )
}

export default Login;