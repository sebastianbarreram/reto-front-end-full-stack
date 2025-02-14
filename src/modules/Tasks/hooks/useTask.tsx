import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { CreateTaskInterface } from '../interfaces/CreateTaskDTO';
import { TaskInterface } from '../interfaces/TaskInterface';

interface Result<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const useTask = () => {
  const createTask = async (
    task: CreateTaskInterface,
  ): Promise<Result<void>> => {
    try {
      const url = `${SUPABASE_URL}/Tasks`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: `${SUPABASE_KEY}`,
        },
        body: JSON.stringify(task),
      });
      if (response.status !== 201) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || 'Failed to create task',
        };
      }
      return { success: true };
    } catch (error) {
      console.error('Error creating task:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  const getUserTasks = async (
    id: string,
  ): Promise<[TaskInterface] | undefined> => {
    try {
      const url = `${SUPABASE_URL}/Tasks?id_user=eq.${id}&select=*`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: `${SUPABASE_KEY}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return { createTask, getUserTasks };
};
