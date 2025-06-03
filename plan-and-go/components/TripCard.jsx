import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TripCard({ trip, onDelete }) {
  const router = useRouter();

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/trip-detail', params: { ...trip } })}
    >
      <View style={styles.header}>
        <Text style={styles.cardTitle}>{trip.name}</Text>
        <TouchableOpacity onPress={onDelete}>
          <MaterialIcons name="delete" size={22} color="grey" />
        </TouchableOpacity>
      </View>
      <Text>Origen: {trip.departureCity}</Text>
      <Text>Destino: {trip.arrivalCity}</Text>
      <Text>Fecha de inicio: {formatDate(trip.startTime)}</Text>
      <Text>Fecha de fin: {formatDate(trip.endTime)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '95%',
    backgroundColor: '#e6f2ff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});