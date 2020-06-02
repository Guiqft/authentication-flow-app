import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/application/user/Home';

const AppStack = createStackNavigator();

export default function UserNavigation(){
    return(
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen name="Home" component={Home}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}