import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/storage/configStore';
import useDateFormat from '../../../shared/hooks/useDateFormat';

// Define InfoItem component
const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View style={styles.infoItem}>
    <Icon name={icon} size={24} color="#00ced1" />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

export const ProfileScreen: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { dateFormat } = useDateFormat();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" size={100} color="#00ced1" />
        <Text style={styles.name}>{user.email.split('@')[0]}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoItem icon="email" label="Email" value={user.email} />
        <InfoItem icon="today" label="Member Since" value={dateFormat(user.created_at)} />
        <InfoItem
          icon="task-alt"
          label="Tasks Created"
          value={tasks ? tasks.length.toString() : '0'}
        />
      </View>


      <TouchableOpacity style={[styles.button, styles.logoutButton]}>
        <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoTextContainer: {
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#00ced1',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ff0000',
    marginTop: 20,
  },
  logoutText: {
    color: '#ff0000',
  },
});
