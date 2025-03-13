import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HeaderTasksScreen = ({ user, onAddPress }: { user: any; onAddPress: () => void }) => (
  <View style={styles.header}>
    <Text>
      Tasks List for email: {user.email} id: {user.id}
    </Text>
    <TouchableOpacity onPress={onAddPress}>
      <Icon name="add-circle" size={50} color="#00ced1" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});

export default HeaderTasksScreen;
