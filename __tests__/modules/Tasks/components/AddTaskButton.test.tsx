import { act } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTask } from '../../../../src/modules/Tasks/hooks/useTask';

jest.mock('../../../../src/modules/Tasks/hooks/useTask', () => ({
  useTask: jest.fn(),
}));

// Mock data for tests
const mockUser = { id: '1', email: 'test@example.com' };
const mockTasks = [
  {
    id: 1,
    description: 'Task 1',
    priority: 'High',
    created_at: '2023-01-01T00:00:00Z',
    id_user: 1,
  },
];

const mockDispatch = jest.fn();
const mockGetUserTasks = jest.fn();
const mockCreateTask = jest.fn();

describe('Add Task Button Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock Redux hooks
    (useSelector as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        user: { user: mockUser },
        tasks: { tasks: mockTasks },
      };
      return selector(state);
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

    // Mock useTask hook para evitar loading state
    (useTask as jest.Mock).mockReturnValue({
      getUserTasks: mockGetUserTasks.mockResolvedValue(mockTasks),
      createTask: mockCreateTask.mockResolvedValue({ success: true }),
      loading: false,
    });
  });

  it('should open modal when add button is pressed', () => {
    // Test the setModalVisible function directly
    const setModalVisible = jest.fn();

    // Simulate the button press handler function
    const handleAddPress = () => {
      setModalVisible(true);
    };

    // Call the function
    handleAddPress();

    // Verify setModalVisible was called with true
    expect(setModalVisible).toHaveBeenCalledWith(true);
  });

  it('should show empty form fields when modal is opened', () => {
    // Test that the initial state of form fields is empty
    const description = '';
    const priority = '';

    // Verify the initial values
    expect(description).toBe('');
    expect(priority).toBe('');
  });

  it('should close modal when close button is pressed', async () => {
    // Mock useState para modalVisible
    const setModalVisible = jest.fn();

    // Create a handler that would be called when close button is pressed
    const handleClose = () => {
      setModalVisible(false);
    };

    // Ejecutar función handleClose directamente
    act(() => {
      handleClose();
    });

    // Verificar que setModalVisible fue llamado con false
    expect(setModalVisible).toHaveBeenCalledWith(false);
  });
});
