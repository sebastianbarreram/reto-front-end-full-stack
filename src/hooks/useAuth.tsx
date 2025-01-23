import { useState } from 'react';
import { useUser } from './useUser';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/UserSlice';
import { AppDispatch } from '../redux/storage/configStore';

export const useAuth = () => {
  const { getUserByEmail } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string, navigation: any) => {
    setLoading(true);
    try {
      const getUserByEmailResponse = await getUserByEmail(email);
      if (getUserByEmailResponse) {
        const user = getUserByEmailResponse[0];
        if (user) {
          const isPasswordValid = password === user.password_hash;
          if (isPasswordValid) {
            dispatch(setUser(user));
            await navigation.navigate('TasksScreen');
          } else {
            throw new Error('Invalid email or password');
          }
        } else {
          throw new Error('Invalid email or password');
        }
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
