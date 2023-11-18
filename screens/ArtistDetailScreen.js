import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const ArtistDetailScreen = ({ route }) => {
  const { artist } = route.params;
  const [artistInfo, setArtistInfo] = useState(null);
  const [allArtworks, setAllArtworks] = useState([]);
  const [artistArtworks, setArtistArtworks] = useState([]);

  useEffect(() => {
    const fetchArtistInfo = async () => {
      try {
        const apiKey = 'APIkey';
        const apiUrl = `https://api.artic.edu/api/v1/agents/${artist.id}?apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        const data = response.data.data;
        setArtistInfo(data);
      } catch (error) {
        console.error('Error fetching artist info:', error);
      }
    };

    const fetchAllArtworks = async () => {
      try {
        const apiKey = 'APIkey';
        const apiUrl = `https://api.artic.edu/api/v1/artworks?limit=100&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        const data = response.data.data;
        setAllArtworks(data);
      } catch (error) {
        console.error('Error fetching all artworks:', error);
      }
    };

    fetchArtistInfo();
    fetchAllArtworks();
  }, [artist.id]);

  useEffect(() => {
    if (allArtworks.length > 0 && artistInfo) {
      const artistArtworks = allArtworks.filter((artwork) => {
        return artwork.artist_id === artist.id;
      });

      setArtistArtworks(artistArtworks);
    }
  }, [allArtworks, artistInfo]);

  return (
    <View style={styles.container}>
      {artistInfo && (
        <View>
          <Text style={styles.artistName}>{artistInfo.title}</Text>
          <Text style={styles.artistBirthDeath}>
            {artistInfo.birth_date} - {artistInfo.death_date}
          </Text>
        </View>
      )}

      <Text style={styles.artworksTitle}>Artist's Artworks</Text>
      <FlatList
        data={artistArtworks}
        renderItem={({ item }) => (
          <View style={styles.artworkItem}>
            <Image
              style={styles.artworkImage}
              source={{ uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/300,/0/default.jpg` }}
            />
            <Text style={styles.artworkTitle}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
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
  artistName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  artistBirthDeath: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  artworksTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artworkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  artworkImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  artworkTitle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ArtistDetailScreen;
