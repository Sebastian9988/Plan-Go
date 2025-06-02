import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    departureCity: '',
    arrivalCity: '',
  });
  const [trips, setTrips] = useState([]); // New state for trips
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

      {/* Trip card */}
      {trips.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{trips[0].name}</Text>
          <Text>From: {trips[0].departureCity}</Text>
          <Text>To: {trips[0].arrivalCity}</Text>
          <Text>Start: {formatDate(trips[0].startTime)}</Text>
          <Text>End: {formatDate(trips[0].endTime)}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>+ Create new trip</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New trip</Text>

            <TextInput
              placeholder="Trip name"
              value={formData.name}
              onChangeText={text => handleChange('name', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Departure city"
              value={formData.departureCity}
              onChangeText={text => handleChange('departureCity', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Arrival city"
              value={formData.arrivalCity}
              onChangeText={text => handleChange('arrivalCity', text)}
              style={styles.input}
            />
            {/* Start date */}
            <Pressable onPress={() => setShowStartTimePicker(true)} style={styles.dateInput}>
              <Text>{formData.startTime ? formatDate(formData.startTime) : 'Select start date'}</Text>
            </Pressable>
            {showStartTimePicker && (
              <DateTimePicker
                value={formData.startTime ? new Date(formData.startTime) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowStartTimePicker(false);
                  if (selectedDate) {
                    handleChange('startTime', selectedDate.toISOString());
                  }
                }}
              />
            )}

            {/* End date */}
            <Pressable onPress={() => setShowEndTimePicker(true)} style={styles.dateInput}>
              <Text>{formData.endTime ? formatDate(formData.endTime) : 'Select end date'}</Text>
            </Pressable>
            {showEndTimePicker && (
              <DateTimePicker
                value={formData.endTime ? new Date(formData.endTime) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowEndTimePicker(false);
                  if (selectedDate) {
                    handleChange('endTime', selectedDate.toISOString());
                  }
                }}
              />
            )}

            <View style={styles.modalButtons}>
              <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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