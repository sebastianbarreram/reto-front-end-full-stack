import {
  Text,
  View,
  Alert,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import Task from '../components/Task';
import { useUser } from '../hooks/useUser';
import { useTask } from '../hooks/useTask';
import React, { useEffect, useState } from 'react';
import { setTasks } from '../redux/slices/TasksSlice';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { TaskInterface } from '../interfaces/TaskInterface';
import InputTextContainer from '../components/InputTextContainer';
import { CreateTaskInterface } from '../interfaces/CreateTaskDTO';
import { AppDispatch, RootState } from '../redux/storage/configStore';

export const TasksScreen = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const { getUserTasks } = useUser();
  const { createTask } = useTask();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getUserTasks(user.id);
        if (data && JSON.stringify(data) !== JSON.stringify(tasks)) {
          dispatch(setTasks(data));
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [dispatch, getUserTasks, user.id, tasks]);

  const renderTasks = ({ item }: ListRenderItemInfo<TaskInterface>) => {
    return (
      <Task
        description={item.description}
        date={item.created_at}
        priority={item.priority}
        id={item.id}
      />
    );
  };

  const handleCreateTask = async () => {
    if (!description || !priority) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      const newTask: CreateTaskInterface = {
        description,
        priority,
        id_user: user.id,
      };
      const result = await createTask(newTask);
      if (result.success) {
        // Refresh tasks or update state
        setModalVisible(false);
        setDescription('');
        setPriority('');
      } else {
        Alert.alert('Error', result.error || 'Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <Text>
          "TasksScreen" email: {user.email} id: {user.id}
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Icon name="add-circle" size={50} color="#00ced1" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTasks}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalInstruction}>
            Please fill out the form to create a new task:
          </Text>
          <InputTextContainer
            style={styles.input}
            iconName="description"
            placeHolder="Description"
            handleOnChange={setDescription}
            value={description}
          />
          <View style={styles.dropdownContainer}>
            <Icon name="alert-circle" size={24} color="rgba(0, 0, 0, 0.6)" />
            <Picker
              selectedValue={priority}
              style={styles.dropdown}
              onValueChange={(priorityValue: string) =>
                setPriority(priorityValue)
              }>
              <Picker.Item label="Highest" value="Highest" />
              <Picker.Item label="High" value="High" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Lowest" value="Lowest" />
            </Picker>
          </View>
          <CustomButton
            title="Create Task"
            onPress={handleCreateTask}
            disabled={!description || !priority}
            style={styles.button}
          />
          <CustomButton title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  addButton: {
    // Adjust styles as needed
  },
  modalView: {
    margin: 18,
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
  input: {
    flexDirection: 'row',
    margin: 8,
  },
  button: {
    marginVertical: 2,
  },
  buttonText: {
    color: 'white',
    height: 48,
    textAlignVertical: 'center',
    fontWeight: '500',
  },
  buttonDisabled: {
    backgroundColor: '#b0e0e6',
  },
  modalInstruction: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.38)',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 4,
  },
  dropdown: {
    flex: 1,
    height: 56,
  },
});
