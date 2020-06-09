import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';

const FormInput = ({
    iconName,
    iconColor,
    returnKeyType,
    keyboardType,
    name,
    placeholder,
    value,
    ...rest
}) => (
    <View style={styles.inputContainer}>
        <Input
            {...rest} //place {...rest} before the new props, so they can be replaced
            placeholderTextColor="#a4a4a4"
            name={name}
            value={value}
            placeholder={placeholder}
            inputStyle={styles.input}
        />
    </View>
);

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 10,
    },
});
  
export default FormInput;