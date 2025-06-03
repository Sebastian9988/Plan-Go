import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TripInfo({ name, departureCity, arrivalCity, startTime, endTime }) {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.details}>
        <Text style={styles.detailText}>Origen: {departureCity}</Text>
        <Text style={styles.detailText}>Destino: {arrivalCity}</Text>
        <Text style={styles.detailText}>Fecha de inicio: {formatDate(startTime)}</Text>
        <Text style={styles.detailText}>Fecha de fin: {formatDate(endTime)}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  details: { marginBottom: 24, alignItems: 'center' },
  detailText: { fontSize: 16, color: '#333', marginBottom: 2 },
});