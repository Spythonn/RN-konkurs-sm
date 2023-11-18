import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const searchArtwork = async () => {
    try {
      setLoading(true);
      const apiKey = 'APIkey';
      const apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
        searchQuery
      )}&fields=id,title,image_id&limit=15&page=${page}&apikey=${apiKey}`;

      const response = await axios.get(apiUrl);
      const data = response.data.data;

      console.log('API Data:', JSON.stringify(data, null, 2));
      if (page === 1 || !searchPerformed) {
        setSearchResults(data);
        setSearchPerformed(true);
      } else {
        setSearchResults((prevResults) => [...prevResults, ...data]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreArtwork = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearchPerformed(false);
    searchArtwork();
  };

  useEffect(() => {
    if (page > 1) {
      searchArtwork();
    }
  }, [page]);

  const loadFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      const favoritesData = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addToFavorites = async (artwork) => {
    try {
      const isFavorite = favorites.some((fav) => fav.id === artwork.id);

      if (!isFavorite) {
        const updatedFavorites = [...favorites, artwork];
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert('Artwork added to favorites!');
      } else {
        const updatedFavorites = favorites.filter((fav) => fav.id !== artwork.id);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert('Artwork removed from favorites!');
      }

      setSearchResults((prevResults) =>
        prevResults.map((item) =>
          item.id === artwork.id ? { ...item, isFavorite: !isFavorite } : item
        )
      );


      setFavorites((prevFavorites) =>
        prevFavorites.some((fav) => fav.id === artwork.id) ? updatedFavorites : prevFavorites
      );
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={styles.resultItem}
    onPress={() => {
      console.log('Pressed ID:', item.id);
      navigation.navigate('ArtworkDetailScreen', { artwork: item }); // Zmiana tutaj
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
        <TouchableOpacity onPress={() => addToFavorites(item)}>
          <Image
            source={require('../assets/icons/heart.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: favorites.some((fav) => fav.id === item.id) ? '#FF0000' : '#808080',
            }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const generateKey = (item) => {
    return `${item.id}`;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder='Search'
        placeholderTextColor='#fff'
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={generateKey}
        onEndReached={loadMoreArtwork}
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
  searchInput: {
    fontSize: 20,
    backgroundColor: '#2E2A29',
    borderRadius: 6,
    color: '#fff',
    marginVertical: 10,
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

export default SearchScreen;
