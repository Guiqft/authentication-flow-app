import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/application/admin/Home';

const AppStack = createStackNavigator();

export default function AdmNavigation(){
    return(
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen name="Home" component={Home}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}