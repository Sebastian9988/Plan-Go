import React from 'react';
import { Modal, Pressable, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AddOptionsModal({ visible, onClose, options }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          {options.map((option, idx) => (
            <TouchableOpacity key={idx} style={styles.modalOption}>
              <Text style={styles.modalOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 80,
  },
  modalOption: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 18,
    color: '#1D3D47',
    fontWeight: '500',
  },
});