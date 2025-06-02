import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TripCard from '../../components/TripCard';
import TripFormModal from '../../components/TripFormModal';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    departureCity: '',
    arrivalCity: '',
  });
  const [trips, setTrips] = useState([]);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteTrip = (idxToDelete) => {
    setTrips(prev => prev.filter((_, idx) => idx !== idxToDelete));
  };

  const handleSave = () => {
    setTrips(prev => [formData, ...prev]);
    setFormData({
      name: '',
      startTime: '',
      endTime: '',
      departureCity: '',
      arrivalCity: '',
    });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Plan&Go</Text>
      <Text style={styles.subtitle}>
        Your assistant to organize trips easily and quickly
      </Text>

      <ScrollView
        style={styles.tripsScroll}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {trips.length > 0 && trips.map((trip, idx) => (
          <TripCard
            key={idx}
            trip={trip}
            onDelete={() => handleDeleteTrip(idx)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>+ Create new trip</Text>
      </TouchableOpacity>

      <TripFormModal
        visible={modalVisible}
        formData={formData}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
        showStartTimePicker={showStartTimePicker}
        setShowStartTimePicker={setShowStartTimePicker}
        showEndTimePicker={showEndTimePicker}
        setShowEndTimePicker={setShowEndTimePicker}
        styles={styles}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#555',
  },
  button: {
    backgroundColor: '#1D3D47',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: '#888',
  },
  saveButton: {
    backgroundColor: '#1D3D47',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
    tripsScroll: {
    width: '100%',
    maxHeight: 300, // Ajusta este valor según tu preferencia
    marginBottom: 24,
  },
});