import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInterface } from '../interfaces/UserInterface';

const initialState: UserInterface = {
  created_at: '',
  email: '',
  id: 0,
  password_hash: '',
};

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialState,
  },
  reducers: {
    setUser(state, action: PayloadAction<UserInterface>) {
      state.user = action.payload;
    },
  },
});

export default UserSlice.reducer;
export const { setUser } = UserSlice.actions;
