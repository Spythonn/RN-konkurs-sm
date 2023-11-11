import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchArtwork = async () => {
    try {
      const apiKey = 'TWÓJ_KLUCZ_API';
      const apiUrl = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(searchQuery)}&fields=id,title,image_id&limit=15&apikey=${apiKey}`;
  
      const response = await axios.get(apiUrl);
      const data = response.data.data;
  
      console.log('Dane z API:', JSON.stringify(data, null, 2));
      setSearchResults(data);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  };

  const loadMoreArtwork = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    searchArtwork();
  }, [page]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        console.log('Kliknięto na dzieło o ID:', item.id);
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
      <TextInput
        style={styles.searchInput}
        placeholder='Search'
        placeholderTextColor='#fff'
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={searchArtwork}
      />
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
    marginBottom: 10,
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SearchScreen;
