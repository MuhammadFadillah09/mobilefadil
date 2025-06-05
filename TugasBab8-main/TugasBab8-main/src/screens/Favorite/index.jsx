import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const favoriteItems = [
  { id: '1', name: 'Produk A', description: 'Deskripsi produk A' },
  { id: '2', name: 'Produk B', description: 'Deskripsi produk B' },
  { id: '3', name: 'Produk C', description: 'Deskripsi produk C' },
];

export default function Favorite() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => alert(`Pilih ${item.name}`)}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDesc}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorit Saya</Text>
      <FlatList
        data={favoriteItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada favorit.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  itemContainer: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  itemName: { fontSize: 18, fontWeight: '600' },
  itemDesc: { fontSize: 14, color: '#555', marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
});
