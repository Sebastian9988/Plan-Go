import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import TripOptions from '../components/TripOptions';
import AddOptionsModal from '../components/AddOptionsModal';
import TripInfo from '../components/TripInfo';

export default function TripDetailScreen() {
  const { name, departureCity, arrivalCity, startTime, endTime } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const options = [
    // { label: 'Viajero', key: 'traveler' },
    { label: 'Itinerario', key: 'itinerary' },
    { label: 'Vuelos', key: 'flights' },
    { label: 'Hospedaje', key: 'lodging' },
  ];

  const addOptions = [
    'Agregar viajero',
    'Agregar destino',
    'Agregar actividad',
    'Agregar vuelo',
    'Agregar hospedaje',
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name }} />
      <TripInfo
        name={name}
        departureCity={departureCity}
        arrivalCity={arrivalCity}
        startTime={startTime}
        endTime={endTime}
      />
      <TripOptions options={options} />
      <AddOptionsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={addOptions}
      />
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 14,
    backgroundColor: '#1D3D47',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    zIndex: 10,
  },
});