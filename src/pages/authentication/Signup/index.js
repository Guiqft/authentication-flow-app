import React, { Fragment, useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthContext } from '../../../components/Context';

import styles from './styles';

//import custom components
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import ErrorMessage from '../../../components/ErrorMessage';

//to validate inputs and show error messages
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Please enter a name'),
    surname: Yup.string()
        .required('Please enter a surname'),
    email: Yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a email'),
    password: Yup.string()
        .label('Password')
        .required()
        .min(8, 'Password must have at least 8 characters '),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const Signup = ({ navigation }) => {
    const { signUp } = useContext(AuthContext);

    const [SignupError, setSignupError] = useState(false);

    return (
        <LinearGradient
            colors={['#3273A6', '#57D9CB']}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.container}
        >
            <KeyboardAwareScrollView>
                <Text style={styles.title}>
                    MyApp
                </Text>
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>
                        Sign Up
                    </Text>
                    <Formik
                        initialValues={{ name: '', surname: '', email: '', password: '', passwordConfirmation: '' }}
                        validationSchema={validationSchema}

                        //'data' gives acess to 'initialValues'
                        onSubmit={async (data) => {
                            var statusCode;
                            var userType = "user",
                            //calling the sigUp from our context, passing form inputs as parameter
                            statusCode = await signUp(data.name, data.surname, data.email, data.password, userType);
                            if (statusCode === 401) setSignupError(true);
                            else if (statusCode === 200) setSignupError(false);
                        }}
                    >
                        {formikProps => (
                            <Fragment>
                                <FormInput
                                    name='name'
                                    value={formikProps.name}
                                    onChangeText={formikProps.handleChange('name')}
                                    placeholder='Name'
                                    autoCapitalize='none'
                                    onBlur={formikProps.handleBlur('name')}
                                />
                                {/* .touched make the error message show only for fields that already are visited*/}
                                <ErrorMessage errorValue={formikProps.touched.name && formikProps.errors.name} />
                                
                                <FormInput
                                    name='surname'
                                    value={formikProps.surname}
                                    onChangeText={formikProps.handleChange('surname')}
                                    placeholder='Surname'
                                    autoCapitalize='none'
                                    onBlur={formikProps.handleBlur('surname')}
                                />                                
                                <ErrorMessage errorValue={formikProps.touched.surname && formikProps.errors.surname} />


                                <FormInput
                                    name='email'
                                    value={formikProps.email}
                                    onChangeText={formikProps.handleChange('email')}
                                    placeholder='Email'
                                    autoCapitalize='none'
                                    onBlur={formikProps.handleBlur('email')}
                                />                                
                                <ErrorMessage errorValue={formikProps.touched.email && formikProps.errors.email} />

                                <FormInput
                                    name='password'
                                    value={formikProps.password}
                                    onChangeText={formikProps.handleChange('password')}
                                    placeholder='Password'
                                    secureTextEntry
                                    onBlur={formikProps.handleBlur('password')}
                                />
                                <ErrorMessage errorValue={formikProps.touched.password && formikProps.errors.password} />

                                <FormInput
                                    name='passwordConfirmation'
                                    value={formikProps.passwordConfirmation}
                                    onChangeText={formikProps.handleChange('passwordConfirmation')}
                                    placeholder='Password Confirmation'
                                    secureTextEntry
                                    onBlur={formikProps.handleBlur('passwordConfirmation')}
                                />
                                <ErrorMessage errorValue={formikProps.touched.passwordConfirmation && formikProps.errors.passwordConfirmation} />

                                {SignupError === true ? (
                                    <ErrorMessage errorValue="Wrong e-mail or password. Try again." />) : (
                                        <View />)
                                }

                                <View style={styles.buttonContainer}>
                                    <FormButton
                                        title='SIGN UP'
                                        onPress={formikProps.submitForm}
                                        //this change the button color to grey if the fileds arent valids or to waiting the auth server response
                                        disabled={!formikProps.isValid}
                                    />
                                </View>
                            </Fragment>
                        )}
                    </Formik>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginButton}>
                        Already have an account? <Text style={{ fontWeight: "bold" }}>Log In</Text>
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </LinearGradient>
    )
}

export default Signup;