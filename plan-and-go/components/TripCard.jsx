import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TripCard({ trip }) {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{trip.name}</Text>
      <Text>From: {trip.departureCity}</Text>
      <Text>To: {trip.arrivalCity}</Text>
      <Text>Start: {formatDate(trip.startTime)}</Text>
      <Text>End: {formatDate(trip.endTime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#e6f2ff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});