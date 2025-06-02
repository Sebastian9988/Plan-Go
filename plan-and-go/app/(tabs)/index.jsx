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
    nombre: '',
    inicio: '',
    fin: '',
    origen: '',
    destino: '',
  });
  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showFinPicker, setShowFinPicker] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Plan&Go</Text>
      <Text style={styles.subtitle}>
        Tu asistente para organizar viajes de forma fácil y rápida
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>+ Crear nuevo viaje</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo viaje</Text>

            <TextInput
              placeholder="Nombre del viaje"
              value={formData.nombre}
              onChangeText={text => handleChange('nombre', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Ciudad de origen"
              value={formData.origen}
              onChangeText={text => handleChange('origen', text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Ciudad destino"
              value={formData.destino}
              onChangeText={text => handleChange('destino', text)}
              style={styles.input}
            />
            {/* Fecha inicio */}
            <Pressable onPress={() => setShowInicioPicker(true)} style={styles.dateInput}>
              <Text>{formData.inicio ? formatDate(formData.inicio) : 'Seleccionar fecha de inicio'}</Text>
            </Pressable>
            {showInicioPicker && (
              <DateTimePicker
                value={formData.inicio ? new Date(formData.inicio) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowInicioPicker(false);
                  if (selectedDate) {
                    handleChange('inicio', selectedDate.toISOString());
                  }
                }}
              />
            )}

            {/* Fecha fin */}
            <Pressable onPress={() => setShowFinPicker(true)} style={styles.dateInput}>
              <Text>{formData.fin ? formatDate(formData.fin) : 'Seleccionar fecha de fin'}</Text>
            </Pressable>
            {showFinPicker && (
              <DateTimePicker
                value={formData.fin ? new Date(formData.fin) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowFinPicker(false);
                  if (selectedDate) {
                    handleChange('fin', selectedDate.toISOString());
                  }
                }}
              />
            )}


            <View style={styles.modalButtons}>
              <Pressable onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => {
                // acá podrías guardar los datos
                console.log('Viaje creado:', formData);
                setModalVisible(false);
              }} style={styles.saveButton}>
                <Text style={styles.saveText}>Guardar</Text>
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
});
