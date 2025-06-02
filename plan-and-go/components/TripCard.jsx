import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TripCard({ trip, onDelete }) {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.cardTitle}>{trip.name}</Text>
        <TouchableOpacity onPress={onDelete}>
          <MaterialIcons name="delete" size={22} color="grey" />
        </TouchableOpacity>
      </View>
      <Text>From: {trip.departureCity}</Text>
      <Text>To: {trip.arrivalCity}</Text>
      <Text>Start: {formatDate(trip.startTime)}</Text>
      <Text>End: {formatDate(trip.endTime)}</Text>
    </View>
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