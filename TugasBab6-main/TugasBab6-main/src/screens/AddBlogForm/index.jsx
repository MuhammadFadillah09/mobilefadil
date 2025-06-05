import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { colors, fontType } from '../../theme';

const AddBlogForm = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    // Logika menyimpan atau mengirim data
    console.log({ title, category, content });
    navigation.goBack(); // Kembali ke screen sebelumnya
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Judul blog" />

      <Text style={styles.label}>Kategori</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Kategori" />

      <Text style={styles.label}>Konten</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Tulis konten blog"
        multiline
        numberOfLines={4}
      />

      <Button title="Simpan" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: colors.white(),
  },
  label: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey(0.3),
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AddBlogForm;
