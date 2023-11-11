import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AllScreen from '../screens/AllScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',  
                    elevation: 0,
                    backgroundColor: '#2E2A29',
                    height: 70,
                    ...style.border
                },
                headerStyle:{
                    backgroundColor: '#2E2A29',
                    borderBottomColor: '#748c94',
                    borderBottomWidth: 1,
                    
                },
                headerTitleStyle: {
                    color: '#fff',
                    fontSize: 23,
                    
                }
            }}
        >
            
            <Tab.Screen name="Home" component={HomeScreen}
             options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0 }}>
                        <Image 
                            source={require('../assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#8C32FF' : '#748c94'
                            }}
                            />
                        <Text style={{color: focused ? '#8C32FF' : '#748c94', fontSize: 12}}>HOME</Text>
                    </View>
                ),
                headerTitleAlign: 'center'
            }} />
            <Tab.Screen name="Search" component={SearchScreen} 
             options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0 }}>
                        <Image 
                            source={require('../assets/icons/search.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#8C32FF' : '#748c94'
                            }}
                            />
                        <Text style={{color: focused ? '#8C32FF' : '#748c94', fontSize: 12}}>SERACH</Text>
                    </View>
                ),
                headerTitleAlign: 'center'
            }} />
            <Tab.Screen name="All" component={AllScreen} 
             options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0 }}>
                        <Image 
                            source={require('../assets/icons/border-all.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#8C32FF' : '#748c94'
                            }}
                            />
                        <Text style={{color: focused ? '#8C32FF' : '#748c94', fontSize: 12}}>ALL</Text>
                    </View>
                ),
                headerTitleAlign: 'center'
            }} />
            <Tab.Screen name="Favourites" component={FavouritesScreen} 
             options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0 }}>
                        <Image 
                            source={require('../assets/icons/heart.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#8C32FF' : '#748c94'
                            }}
                            />
                        <Text style={{color: focused ? '#8C32FF' : '#748c94', fontSize: 12}}>FAVOURITES</Text>
                    </View>
                ),
                headerTitleAlign: 'center'
            }} />
            <Tab.Screen name="Settings" component={SettingsScreen} 
             options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0 }}>
                        <Image 
                            source={require('../assets/icons/settings.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#8C32FF' : '#748c94'
                            }}
                            />
                        <Text style={{color: focused ? '#8C32FF' : '#748c94', fontSize: 12}}>SETTINGS</Text>
                    </View>
                ),
                headerTitleAlign: 'center'
            }} />
        </Tab.Navigator>
    );
}

const style = StyleSheet.create({
    border: {
       borderTopWidth: 1,
       borderBlockColor: '#748c94',
       
    }

});

export default Tabs;