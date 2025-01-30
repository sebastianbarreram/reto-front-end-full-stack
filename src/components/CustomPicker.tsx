import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string; icon: string }[];
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  selectedValue,
  onValueChange,
  items,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [dropdownTop, setDropdownTop] = React.useState(0);
  const pickerRef = useRef<View>(null);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const openDropdown = () => {
    pickerRef.current?.measure((fx, fy, width, height, px, py) => {
      setDropdownTop(py + height);
      setModalVisible(true);
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.picker}
        onPress={openDropdown}
        ref={pickerRef}>
        <Text style={styles.pickerText}>{selectedValue}</Text>
        <Icon name="chevron-down" size={24} color="rgba(0, 0, 0, 0.6)" />
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalView, { top: dropdownTop }]}>
                <FlatList
                  data={items}
                  keyExtractor={item => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => handleSelect(item.value)}>
                      <Icon
                        name={item.icon}
                        size={24}
                        color="rgba(0, 0, 0, 0.6)"
                      />
                      <Text style={styles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.38)',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 4,
  },
  pickerText: {
    fontSize: 16,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    position: 'absolute',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default CustomPicker;
