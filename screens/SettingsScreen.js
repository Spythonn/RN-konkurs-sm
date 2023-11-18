import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, Alert } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [languageSwitch, setLanguageSwitch] = useState(false);
  const [settings, setSettings] = useState({
    version: '1.0.3',
    language: 'English',
  });

  const toggleLanguageSwitch = () => {
    if (!languageSwitch) {
      Alert.alert("Polish language isn't supported yet");
    }
    setLanguageSwitch(!languageSwitch);
  };

  const resetSettings = () => {
    setSettings({
      version: '1.0.3',
      language: 'English',
    });
    Alert.alert('Settings reset to default');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Change Language to Polish:</Text>
        <Switch value={languageSwitch} onValueChange={toggleLanguageSwitch} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={`Version`}
          onPress={() => {
            Alert.alert('Version: 1.0.3');
          }}
          color="#748c94"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Terms and Service"
          onPress={() => {
            Alert.alert('By using our Arty service, you agree to comply with our terms.');
          }}
          color="#748c94"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Author"
          onPress={() => {
            Alert.alert('Author: Kacper Spytek');
          }}
          color="#748c94"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Reset Settings"
          onPress={resetSettings}
          color="#748c94"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Go back"
          onPress={() => navigation.goBack()}
          color="#748c94"
        />
      </View>
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
  heading: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '80%',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 15,
  },
});

export default SettingsScreen;
