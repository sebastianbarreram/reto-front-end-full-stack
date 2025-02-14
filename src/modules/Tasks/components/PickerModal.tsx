import React from 'react';
import { Modal, View, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface PickerModalProps {
  visible: boolean;
  onClose: () => void;
  top: number;
  items: { label: string; value: string; icon: string; color: string }[];
  renderItem: ({ item }: { item: { label: string; value: string; icon: string; color: string } }) => JSX.Element;
}

const PickerModal: React.FC<PickerModalProps> = ({ visible, onClose, top, items, renderItem }) => (
  <Modal visible={visible} transparent={true} animationType="fade">
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback>
          <View style={[styles.modalView, { top }]}>
            <FlatList
              data={items}
              keyExtractor={item => item.value}
              renderItem={renderItem}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: 'absolute',
    width: '63%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 300,
  },
});

export default PickerModal;
