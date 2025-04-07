import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/storage/configStore';

interface HeaderTasksScreenProps {
  onAddPress: () => void;
}

const HeaderTasksScreen: React.FC<HeaderTasksScreenProps> = ({
  onAddPress,
}) => {
  const { user } = useSelector((state: RootState) => state.user);

  const username = user.email ? user.email.split('@')[0] : 'User';

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Welcome, {username}</Text>
      <TouchableOpacity onPress={onAddPress} testID="add-task-button">
        <Icon name="add-circle" size={50} color="#00ced1" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'System',
  },
});

export default HeaderTasksScreen;
