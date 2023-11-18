import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PAGE_SIZE = 15;

const FavouritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem('favorites');
        const favoritesData = favoritesString ? JSON.parse(favoritesString) : [];
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={styles.resultItem}
    onPress={() => {
      console.log('Pressed ID:', item.id);
      navigation.navigate('ArtworkDetailScreen', { artwork: item }); 
    }}
    >
      <Image
        style={styles.resultImage}
        source={{ uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/300,/0/default.jpg` }}
      />
      <Text style={styles.resultTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FavouritesScreen;
