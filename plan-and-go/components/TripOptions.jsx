import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TripOptions({ options }) {
  return (
    <View style={styles.optionsContainer}>
      {options.map(opt => (
        <TouchableOpacity key={opt.key} style={styles.card}>
          <Text style={styles.cardText}>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: '90%',
    backgroundColor: '#e6f2ff',
    borderRadius: 12,
    padding: 32,
    marginBottom: 24,
    alignItems: 'center',
    elevation: 2,
  },
  cardText: { fontSize: 20, fontWeight: '600', color: '#1D3D47' },
});