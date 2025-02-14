import { TaskInterface } from '../../modules/Tasks/interfaces/TaskInterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TaskInterface[] = [];

const TasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: initialState,
    loading: false,
  },
  reducers: {
    setTasks(state, action: PayloadAction<TaskInterface[]>) {
      state.tasks = action.payload;
    },
  },
});

export default TasksSlice.reducer;
export const { setTasks } = TasksSlice.actions;
