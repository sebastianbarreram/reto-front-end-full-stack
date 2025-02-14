import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { UserInterface } from '../../modules/Login/interfaces/UserInterface';

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

  const createUser = async (
    email: string,
    password: string,
  ): Promise<void | undefined> => {
    try {
      const url = `${SUPABASE_URL}/Users`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: `${SUPABASE_KEY}`,
        },
        body: JSON.stringify({ email, password_hash: password }),
      });
      console.log('createUser response.status :>> ', response.status);
      if (response.status !== 201) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  return { getUserByEmail, createUser };
};
