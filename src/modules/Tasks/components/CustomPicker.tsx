import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PickerContainer from '../atoms/PickerContainer';
import PickerLabel from '../atoms/PickerLabel';
import PickerItem from '../atoms/PickerItem';
import PickerModal from './PickerModal';

interface CustomPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string; icon: string; color: string }[];
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

  const renderItem = ({
    item,
  }: {
    item: { label: string; value: string; icon: string; color: string };
  }) => (
    <PickerItem
      label={item.label}
      value={item.value}
      icon={item.icon}
      color={item.color}
      onSelect={handleSelect}
    />
  );

  return (
    <PickerContainer>
      <PickerLabel>Priority</PickerLabel>
      <TouchableOpacity
        style={styles.picker}
        onPress={openDropdown}
        ref={pickerRef}>
        <Text style={styles.pickerText}>{selectedValue}</Text>
        <Icon name="arrow-drop-down" size={24} color="rgba(0, 0, 0, 0.6)" />
      </TouchableOpacity>
      <PickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        top={dropdownTop}
        items={items}
        renderItem={renderItem}
      />
    </PickerContainer>
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
    width: 200,
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'System',
  },
});

export default CustomPicker;
