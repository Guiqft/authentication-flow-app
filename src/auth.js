import { AsyncStorage } from "react-native";

import api from './services/api';

export const USER_KEY = "authentication";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export async function getToken(data) {
    const headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'access-control-allow-origin': '*'
    };

    const response = await api.post('/auth/login', data, {
        headers: headers
    })
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
    
    return response; 
}

export const isSignedIn = () => {
//   return new Promise((resolve, reject) => {
//     AsyncStorage.getItem(USER_KEY)
//       .then(res => {
//         if (res !== null) {
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//       })
//       .catch(err => reject(err));
//   });

    return true;
};