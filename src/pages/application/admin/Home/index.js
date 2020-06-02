import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

import styles from './styles';

import { AuthContext } from '../../../../components/Context';

const Home = () => {
    const { signOut } = useContext(AuthContext); 

    return(
        <View style={styles.home}>
            <Text>
                This is the ADMIN Home screen!
            </Text>

            <Button
                title="SignOut"
                onPress={() => {signOut()}}
                titleStyle={{ color: '#F57C00' }}
                type='clear'
            />

        </View>
    );
}

export default Home;