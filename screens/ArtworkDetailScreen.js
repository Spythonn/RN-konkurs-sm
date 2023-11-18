import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ArtworkDetailScreen = ({ route }) => {
    const { artwork } = route.params;
    const [extendedArtworkInfo, setExtendedArtworkInfo] = useState(null);
    const navigation = useNavigation();
  
    useEffect(() => {
      const fetchExtendedArtworkInfo = async () => {
        try {
          const apiKey = 'APIkey';
          const apiUrl = `https://api.artic.edu/api/v1/artworks/${artwork.id}?apikey=${apiKey}`;
          const response = await axios.get(apiUrl);
          const data = response.data.data;
          setExtendedArtworkInfo(data);
        } catch (error) {
          console.error('Error fetching extended artwork info:', error);
        }
      };
  
      fetchExtendedArtworkInfo();
    }, [artwork.id]);
  
    const navigateToArtistDetail = () => {
      if (extendedArtworkInfo && extendedArtworkInfo.artist_id) {
        const { artist_display } = extendedArtworkInfo;
        const [artistFirstName, artistLastName] = artist_display.split(' ');
  
        navigation.navigate('ArtistDetailScreen', {
          artist: {
            id: extendedArtworkInfo.artist_id,
            firstName: artistFirstName,
            lastName: artistLastName,
          },
        });
      }
    };
  
    return (
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/600,/0/default.jpg` }}
          style={styles.artworkImage}
          resizeMode="cover"
        />
  
        <ScrollView style={styles.artworkInfo} nestedScrollEnabled>
          <Text style={styles.artworkTitle}>Title: {artwork.title}</Text>
          {extendedArtworkInfo && (
            <>
              <TouchableOpacity onPress={navigateToArtistDetail}>
                <Text style={styles.artworkAuthor}>Author: {extendedArtworkInfo.artist_display}</Text>
              </TouchableOpacity>
              <Text style={styles.artworkDates}>
                Start and end date: {extendedArtworkInfo.date_start} - {extendedArtworkInfo.date_end}
              </Text>
              <Text style={styles.artworkDescription}>Description: {extendedArtworkInfo.description}</Text>
            </>
          )}
        </ScrollView>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  artworkImage: {
    width: '100%',
    height: 250,
  },
  artworkInfo: {
    padding: 15,
  },
  artworkTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artworkAuthor: {
    color: '#fff', 
    fontSize: 18,
    marginBottom: 5,
    textDecorationLine: 'underline', 
  },
  artworkDates: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  artworkDescription: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ArtworkDetailScreen;
