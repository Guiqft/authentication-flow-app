import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/authentication/Login';
import Signup from '../pages/authentication/Signup';

const AuthStack = createStackNavigator();

export default function AuthNavigation(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login}/>
            <AuthStack.Screen name="Signup" component={Signup}/>
        </AuthStack.Navigator>
    );
}