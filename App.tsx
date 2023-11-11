import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#000000" }}>
          <Image
            source={require('./assets/images/logo.png')}
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
          <ActivityIndicator size="large" color="#8C32FF" />
          <Text style={{color:'#fff', fontSize: 20, fontFamily: "Poppins-Thin", textAlign:'center', top: 20, paddingLeft: 20, paddingRight: 20}}>Your Gateway to an Online Art Gallery Experience!</Text>
        </View>
      ) : (
        <Tabs />
      )}
    </NavigationContainer>
  );
};

export default App;
