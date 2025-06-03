import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

export default function TripDetailScreen() {
  const { name, departureCity, arrivalCity, startTime, endTime } = useLocalSearchParams();

  const options = [
    { label: 'Viajero', key: 'traveler' },
    { label: 'Itinerario', key: 'itinerary' },
    { label: 'Vuelos', key: 'flights' },
    { label: 'Hospedaje', key: 'lodging' },
  ];

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name }} />
      <Text style={styles.title}>{name}</Text>
      <View style={styles.details}>
        <Text style={styles.detailText}>Origen: {departureCity}</Text>
        <Text style={styles.detailText}>Destino: {arrivalCity}</Text>
        <Text style={styles.detailText}>Fecha de inicio: {formatDate(startTime)}</Text>
        <Text style={styles.detailText}>Fecha de fin: {formatDate(endTime)}</Text>
      </View>
      <View style={styles.optionsContainer}>
        {options.map(opt => (
          <TouchableOpacity key={opt.key} style={styles.card}>
            <Text style={styles.cardText}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  details: { marginBottom: 24, alignItems: 'center' },
  detailText: { fontSize: 16, color: '#333', marginBottom: 2 },
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