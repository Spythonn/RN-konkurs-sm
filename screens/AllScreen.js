import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const AllScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={{color:'#fff'}}>All Screen</Text>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default AllScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000' 
    },
});