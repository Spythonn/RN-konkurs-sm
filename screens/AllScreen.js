import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const AllScreen = ({ navigation }) => {
  const PAGE_SIZE = 15;
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArtworks();
  }, [page]);

  const fetchArtworks = async () => {
    try {
      const apiKey = 'APIkey';
      const apiUrl = `https://api.artic.edu/api/v1/artworks?limit=${PAGE_SIZE}&page=${page}&apikey=${apiKey}&fields=id,title,image_id,artist_display,date_display`;
  
      const response = await axios.get(apiUrl);
      const data = response.data.data;
  
      if (page === 1) {
        setArtworks(data);
      } else {
        setArtworks((prevArtworks) => [...prevArtworks, ...data]);
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  const loadMoreArtworks = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        console.log('Pressed ID:', item.id);
        navigation.navigate('ArtworkDetailScreen', { artwork: item });
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={styles.resultImage}
          source={{ uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/300,/0/default.jpg` }}
        />
        <Text style={styles.resultTitle}>{item.title}</Text>
      </View>
  
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <HeartButton artwork={item} />
      </View>
    </TouchableOpacity>
  );
  
  const HeartButton = ({ artwork }) => {
    const [isFavorite, setIsFavorite] = useState(false);
  
    const checkIfFavorite = useCallback(async () => {
      try {
        const favoritesString = await AsyncStorage.getItem('favorites');
        const favoritesData = favoritesString ? JSON.parse(favoritesString) : [];
        const isFav = favoritesData.some((fav) => fav.id === artwork.id);
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Error checking favorites:', error);
      }
    }, [artwork.id]);
  
    const addToFavorites = async () => {
      try {
        const favoritesString = await AsyncStorage.getItem('favorites');
        let favoritesData = favoritesString ? JSON.parse(favoritesString) : [];
  
        if (!isFavorite) {
          favoritesData.push(artwork);
        } else {
          favoritesData = favoritesData.filter((fav) => fav.id !== artwork.id);
        }
  
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesData));
        checkIfFavorite();
      } catch (error) {
        console.error('Error updating favorites:', error);
      }
    };
  
    useEffect(() => {
      checkIfFavorite();
    }, [checkIfFavorite]);
  
    return (
      <TouchableOpacity onPress={addToFavorites} disabled={isFavorite}>
        <Image
          source={require('../assets/icons/heart.png')}
          style={{ width: 25, height: 25, tintColor: isFavorite ? '#FF0000' : '#808080' }}
        />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favoritesData = favoritesString ? JSON.parse(favoritesString) : [];
      setArtworks(favoritesData);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={artworks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreArtworks}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 10,
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

export default AllScreen;
