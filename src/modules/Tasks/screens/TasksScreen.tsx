import {
  Text,
  View,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import Task from '../atoms/Task';
import { useTask } from '../hooks/useTask';
import React, { useEffect, useState } from 'react';
import CustomPicker from '../components/CustomPicker';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../../../redux/slices/TasksSlice';
import CreateTaskModal from '../components/CreateTaskModal';
import { priorityItems } from '../../../config/priorityItems';
import HeaderTasksScreen from '../components/HeaderTaskScreen';
import { TaskInterface } from '../interfaces/TaskInterface';
import { CreateTaskInterface } from '../interfaces/CreateTaskDTO';
import { AppDispatch, RootState } from '../../../redux/storage/configStore';

const EmptyListComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No tasks found</Text>
  </View>
);

export const TasksScreen = ({ testMode = false }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const { createTask, getUserTasks } = useTask();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');

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

  const filteredTasks = filterPriority
    ? tasks.filter(task => task.priority === filterPriority)
    : tasks;

  const clearFilter = () => {
    setFilterPriority('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderTasksScreen onAddPress={() => setModalVisible(true)} />
      <View style={styles.filterContainer}>
        <CustomPicker
          selectedValue={filterPriority}
          onValueChange={setFilterPriority}
          items={[...priorityItems]}
        />
        {filterPriority && (
          <TouchableOpacity
            style={styles.clearFilterButton}
            onPress={clearFilter}>
            <Text style={styles.clearFilterText}>Clear Filter</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTasks}
        ListEmptyComponent={EmptyListComponent}
      />
      <CreateTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        description={description}
        setDescription={setDescription}
        priority={priority}
        setPriority={setPriority}
        onCreateTask={handleCreateTask}
        testHelperSetPriority={testMode ? 'High' : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'System',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  clearFilterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  clearFilterText: {
    color: '#00ced1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'System',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'System',
    textAlign: 'center',
  },
});
