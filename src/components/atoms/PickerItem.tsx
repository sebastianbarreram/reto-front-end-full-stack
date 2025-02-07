import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PickerItemProps {
  label: string;
  value: string;
  icon: string;
  color: string;
  onSelect: (value: string) => void;
}

const PickerItem: React.FC<PickerItemProps> = ({ label, value, icon, color, onSelect }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => onSelect(value)}>
    <Icon
      name={icon}
      size={24}
      color={color}
    />
    <Text style={styles.itemText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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

export default PickerItem;
