import {
  Text,
  View,
  Modal,
  Button,
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
    try {
      const newTask: CreateTaskInterface = {
        description,
        priority,
        id_user: user.id,
      };
      await createTask(newTask);
      // Refresh tasks or update state
      setModalVisible(false);
      setDescription('');
      setPriority('');
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
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
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
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <InputTextContainer
            style={styles.input}
            iconName="description"
            placeHolder="Description"
            handleOnChange={setDescription}
            value={description}
          />
          <InputTextContainer
            style={styles.input}
            iconName="low-priority"
            placeHolder="Priority"
            handleOnChange={setPriority}
            value={priority}
          />
          <Button title="Create Task" onPress={handleCreateTask} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    alignItems: 'center',
    margin: 8,
    marginVertical: 15,
  },
});
