import React, { useEffect, useMemo, useReducer } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import AuthNavigation from './navigation/AuthNavigation';
import AdmNavigation from './navigation/AdmNavigation';
import UserNavigation from './navigation/UserNavigation';

import { AuthContext } from './components/Context';
import { getToken, insertUser } from './auth';

const Routes = () => {
    const initialAuthState = {
        userToken: null,
        userType: null,
        isLoading: true,
    };

    const authReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.userToken,
                    userType: action.userType,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.userToken,
                    userType: action.userType,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userToken: null,
                    userType: null,
                    isLoading: false,
                };
            case 'SIGNUP':
                return {
                    ...prevState,
                    userToken: action.userToken,
                    userType: action.userType,
                    isLoading: false,
                };
        }
    }

    const [authState, dispatch] = useReducer(authReducer, initialAuthState);

    const authContext = useMemo(() => ({
        signIn: async (email, password) => {
            let token;
            token = null;

            let user_type;
            user_type = null;

            let data = {
                email: email,
                password: password,
            };
        
            //getting the acess token
            const response = await getToken(data);
        
            //if everything is fine
            if (response.status === 200) {
                //then save the token in local storage
                token = response.data.acess_token;
                user_type = response.data.user_type;
                await SecureStore.setItemAsync("authorization", token);
                await SecureStore.setItemAsync("user_type", user_type);
            }
            else if (response.status === 401){
                console.log("Wrong email or password");
            }
            
            dispatch({ type: "LOGIN", userToken: token, userType: user_type });

            return response.status;
        },
        signOut: async () => {
            try {
                await SecureStore.deleteItemAsync("authorization");
                await SecureStore.deleteItemAsync("user_type");
            } catch (error) {
                console.log(error);
            }

            dispatch({ type: "LOGOUT" });
        },
        signUp: async (name, surname, email, password, type) => {
            let token;
            token = null;

            let user_type;
            user_type = null;

            let data = {
                name: name,
                surname: surname,
                email: email,
                password: password,
                type: type,
            };
        
            //getting the acess token
            const response = await insertUser(data);
        
            //if everything is fine
            if (response.status === 200) {
                //then save the token in local storage
                token = response.data.acess_token;
                user_type = response.data.user_type;
                await SecureStore.setItemAsync("authorization", token);
                await SecureStore.setItemAsync("user_type", user_type);
            }
            else if (response.status === 42){
                console.log("Email already in use");
            }
            
            dispatch({ type: "SIGNUP", userToken: token, userType: user_type });

            return response.status;
        },
    }), []);

    useEffect(() => {
        setTimeout(async () => {
            let token;
            token = null;

            let user_type;
            user_type = null;

            try {
                token = await SecureStore.getItemAsync("authorization");
                user_type = await SecureStore.getItemAsync("user_type");
            } catch(error){
                console.log(error);
            }

            dispatch({type: "RETRIEVE_TOKEN", userToken: token, userType: user_type });
        }, 500);
    }, []);

    if (authState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        //value={authContext} pass our auth functions to the other components
        <AuthContext.Provider value={authContext}>
            {authState.userToken !== null ? (
                authState.userType === "administrator" ? (
                    <AdmNavigation />
                ) : (
                    <UserNavigation />
                )
            ) : ( 
                <AuthNavigation /> 
            )}
        </AuthContext.Provider>
    );
};

export default Routes;