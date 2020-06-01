import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/application/Home';

const AppStack = createStackNavigator();

export default function AppNavigation(){
    return(
        <AppStack.Navigator>
            <AppStack.Screen name="Home" component={Home}/>
        </AppStack.Navigator>
    );
}