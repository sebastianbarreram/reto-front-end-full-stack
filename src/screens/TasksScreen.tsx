import Task from '../components/Task';
import { useUser } from '../hooks/useUser';
import React, { useEffect, useState } from 'react';
import { setTasks } from '../redux/slices/TasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TaskInterface } from '../interfaces/TaskInterface';
import { AppDispatch, RootState } from '../redux/storage/configStore';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';

export const TasksScreen = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);
  const { getUserTasks } = useUser();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        getUserTasks(user.id).then(data => {
          if (data) {
            dispatch(setTasks(data));
          }
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [dispatch, getUserTasks, user.id]);

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

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>
        "TasksScreen" email: {user.email} id: {user.id}
      </Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTasks}
      />
    </View>
  );
};
