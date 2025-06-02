import React from 'react';
import { Modal, View, Text, TextInput, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export default function TripFormModal({
  visible,
  formData,
  onChange,
  onSave,
  onCancel,
  showStartTimePicker,
  setShowStartTimePicker,
  showEndTimePicker,
  setShowEndTimePicker,
  styles,
}) {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>New trip</Text>

          <TextInput
            placeholder="Trip name"
            value={formData.name}
            onChangeText={text => onChange('name', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Departure city"
            value={formData.departureCity}
            onChangeText={text => onChange('departureCity', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Arrival city"
            value={formData.arrivalCity}
            onChangeText={text => onChange('arrivalCity', text)}
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
                  onChange('startTime', selectedDate.toISOString());
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
                  onChange('endTime', selectedDate.toISOString());
                }
              }}
            />
          )}

          <View style={styles.modalButtons}>
            <Pressable onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={onSave} style={styles.saveButton}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}