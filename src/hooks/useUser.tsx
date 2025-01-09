import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { UserInterface } from '../interfaces/UserInterface';
import { TaskInterface } from '../interfaces/TaskInterface';

export const useUser = () => {
  const getUserByEmail = async (
    email: string,
  ): Promise<[UserInterface] | undefined> => {
    try {
      const url = `${SUPABASE_URL}/Users?email=eq.${email}&select=*`;
      const response: Response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: `${SUPABASE_KEY}`,
        },
      });
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
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

  return { getUserByEmail, getUserTasks };
};
