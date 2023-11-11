import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Text style={{color:'#fff', fontSize: 40, fontFamily: "Poppins-Light"}}>Welcome to</Text>
            <Image 
                        source={require('../assets/images/logo.png')}
                        style={{
                             width: 200,
                             height: 200
                        }}
                />
            <Text style={styles.firstText}>An online art gallery</Text>
            <Text style={styles.secondText}>With this app, you can browse artworks from all collaborating Art Institutes. 
            Check out the author's stories, the date the work was created and much more in one simple, modern application. </Text>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        top: -40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000' 
    },
    firstText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Poppins-ThinItalic'
    },
    secondText: {
        color: '#fff',
        top: 10,
        fontSize: 20,
        paddingRight: 17,
        paddingLeft: 17,
        fontFamily: 'Poppins-Light',
        textAlign: 'center',
        
    }
});