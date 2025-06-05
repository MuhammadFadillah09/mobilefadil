import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function Setting() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('Indonesia');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'Indonesia' ? 'English' : 'Indonesia'));
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Apakah Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Ya', onPress: () => console.log('Logout berhasil') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Mode Gelap</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity style={styles.settingItem} onPress={toggleLanguage}>
        <Text style={styles.label}>Bahasa</Text>
        <Text style={styles.value}>{language}</Text>
      </TouchableOpacity>

      <View style={styles.settingItem}>
        <Text style={styles.label}>Tentang Aplikasi</Text>
        <Text style={styles.value}>Versi 1.0.0</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
  },
  logoutText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
