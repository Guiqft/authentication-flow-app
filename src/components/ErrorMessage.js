import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { render } from 'react-dom';

const ErrorMessage = ({ errorValue }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.errorText}>{errorValue}</Text>
        </View>
    )   
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 25
    },
    errorText: {
        color: 'red'
    }
});
  
export default ErrorMessage;