import Task from '../atoms/Task';
import { useTask } from '../hooks/useTask';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../../../redux/slices/TasksSlice';
import CreateTaskModal from '../components/CreateTaskModal';
import HeaderTasksScreen from '../components/HeaderTaskScreen';
import { TaskInterface } from '../interfaces/TaskInterface';
import { CreateTaskInterface } from '../interfaces/CreateTaskDTO';
import { AppDispatch, RootState } from '../../../redux/storage/configStore';
import { Text, View, Alert, FlatList, ListRenderItemInfo } from 'react-native';

export const TasksScreen = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const { createTask, getUserTasks } = useTask();
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

  const renderTasks = ({ item }: ListRenderItemInfo<TaskInterface>) => (
    <Task
      description={item.description}
      date={item.created_at}
      priority={item.priority}
      id={item.id}
    />
  );

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
      <HeaderTasksScreen user={user} onAddPress={() => setModalVisible(true)} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTasks}
      />
      <CreateTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        description={description}
        setDescription={setDescription}
        priority={priority}
        setPriority={setPriority}
        onCreateTask={handleCreateTask}
      />
    </View>
  );
};
