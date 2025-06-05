import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';

const AddDataForm = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title || !category || !description) {
      Alert.alert('Form belum lengkap', 'Mohon isi semua kolom');
      return;
    }
    Alert.alert('Data ditambahkan:', `Judul: ${title}\nKategori: ${category}\nDeskripsi: ${description}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul</Text>
      <TextInput
        placeholder="Masukkan judul"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Kategori</Text>
      <TextInput
        placeholder="Masukkan kategori"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        placeholder="Masukkan deskripsi"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
      />

      <Button title="Simpan" color="black" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AddDataForm;
