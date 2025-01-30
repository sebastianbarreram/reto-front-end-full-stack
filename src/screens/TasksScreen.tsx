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
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import CustomPicker from '../components/CustomPicker';
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
        <View style={styles.modalContainer}>
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
            <CustomPicker
              selectedValue={priority}
              onValueChange={setPriority}
              items={[
                { label: 'Highest', value: 'Highest', icon: 'arrow-up-circle' },
                { label: 'High', value: 'High', icon: 'arrow-up' },
                { label: 'Medium', value: 'Medium', icon: 'remove-circle' },
                { label: 'Low', value: 'Low', icon: 'arrow-down' },
                { label: 'Lowest', value: 'Lowest', icon: 'arrow-down-circle' },
              ]}
            />
            <CustomButton
              title="Create Task"
              onPress={handleCreateTask}
              disabled={!description || !priority}
              style={styles.button}
            />
            <CustomButton title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Ensure the background is transparent
  },
  modalView: {
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
});
