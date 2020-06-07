import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';

const FormButton = ({ title, buttonType, ...rest }) => (
  <LinearGradient 
    colors={['#d4586f', '#845695']} 
    start={[0, 0]} 
    end={[1, 0]}
    style={{borderRadius:20}}
  >
    <Button
      {...rest}
      type={buttonType}
      title={title}
      buttonStyle={styles.formButton}
      titleStyle={styles.formButtonTitle}
    />
  </LinearGradient> 
)

const styles = StyleSheet.create({
  formButton: {
    backgroundColor: "transparent",
    borderRadius: 20
  },
  formButtonTitle: {
    color: "white",
    fontWeight: "300",
  }
});
  
  export default FormButton