import React from 'react';
import { createSwitchNavigator, NavigationContainer } from '@react-navigation/native';

import AppNavigation from './navigation/AppNavigation';
import AuthNavigation from './navigation/AuthNavigation';

import { isSignedIn } from "./auth";
import { render } from 'react-dom';

export default class Routes extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
          signedIn: false,
          checkedSignIn: false
        };
    };

    componentDidMount(){
        isSignedIn();
        //   .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
        //   .catch(err => alert("An error occurred"));
    };
    
    render(){
        const { checkedSignIn, signedIn } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        // if (!checkedSignIn) {
        //     return null;
        // }

        if (signedIn) {
            return (<NavigationContainer><AppNavigation /></NavigationContainer>);
        } else {
            return (<NavigationContainer><AuthNavigation /></NavigationContainer>);
        }
    }
};