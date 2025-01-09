import { SUPABASE_URL, SUPABASE_KEY } from '@env';
import { UserInterface } from './interfaces/userInterface';

export const useUser = () => {
  const getUserByEmail = async (
    email: string,
  ): Promise<[UserInterface] | undefined> => {
    try {
      const url = `${SUPABASE_URL}/Users?email=eq.${email}&select=*`;
      console.log(
        'url',
        url,
        'process.env.SUPABASE_KEY: ',
        process.env.SUPABASE_KEY,
      );
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
  return { getUserByEmail };
};
