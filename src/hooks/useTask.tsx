import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { CreateTaskInterface } from '../interfaces/CreateTaskDTO';

export const useTask = () => {
  const createTask = async (
    task: CreateTaskInterface,
  ): Promise<void | undefined> => {
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
        throw new Error(errorData.message || 'Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  return { createTask };
};
