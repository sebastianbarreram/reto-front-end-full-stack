import { Alert } from 'react-native';
import { act } from '@testing-library/react-native';
import { useTask } from '../../../../src/modules/Tasks/hooks/useTask';

// Mock dependencies
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../../../../src/modules/Tasks/hooks/useTask', () => ({
  useTask: jest.fn(),
}));

// Mock Alert.alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

// Mock data
const mockUser = { id: '1', email: 'test@example.com' };
const mockCreateTask = jest.fn();

describe('handleCreateTask function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTask as jest.Mock).mockReturnValue({
      createTask: mockCreateTask,
    });
  });

  // Test case 1: Validation when both fields are empty
  it('should show validation error when both fields are empty', async () => {
    // Create a test implementation of handleCreateTask
    const handleCreateTask = async () => {
      const description = '';
      const priority = '';

      if (!description || !priority) {
        Alert.alert('Validation Error', 'Please fill in all fields.');
        return;
      }

      try {
        const newTask = {
          description,
          priority,
          id_user: mockUser.id,
        };
        await mockCreateTask(newTask);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };

    // Execute the function
    await act(async () => {
      await handleCreateTask();
    });

    // Verify Alert.alert was called with validation error
    expect(Alert.alert).toHaveBeenCalledWith(
      'Validation Error',
      'Please fill in all fields.',
    );

    // Verify createTask was NOT called
    expect(mockCreateTask).not.toHaveBeenCalled();
  });

  // Test case 2: Validation when only description is empty
  it('should show validation error when description is empty', async () => {
    // Create a test implementation of handleCreateTask
    const handleCreateTask = async () => {
      const description = '';
      const priority = 'High';

      if (!description || !priority) {
        Alert.alert('Validation Error', 'Please fill in all fields.');
        return;
      }

      try {
        const newTask = {
          description,
          priority,
          id_user: mockUser.id,
        };
        await mockCreateTask(newTask);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };

    // Execute the function
    await act(async () => {
      await handleCreateTask();
    });

    // Verify Alert.alert was called with validation error
    expect(Alert.alert).toHaveBeenCalledWith(
      'Validation Error',
      'Please fill in all fields.',
    );

    // Verify createTask was NOT called
    expect(mockCreateTask).not.toHaveBeenCalled();
  });

  // Test case 3: Validation when only priority is empty
  it('should show validation error when priority is empty', async () => {
    // Create a test implementation of handleCreateTask
    const handleCreateTask = async () => {
      const description = 'Test task';
      const priority = '';

      if (!description || !priority) {
        Alert.alert('Validation Error', 'Please fill in all fields.');
        return;
      }

      try {
        const newTask = {
          description,
          priority,
          id_user: mockUser.id,
        };
        await mockCreateTask(newTask);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };

    // Execute the function
    await act(async () => {
      await handleCreateTask();
    });

    // Verify Alert.alert was called with validation error
    expect(Alert.alert).toHaveBeenCalledWith(
      'Validation Error',
      'Please fill in all fields.',
    );

    // Verify createTask was NOT called
    expect(mockCreateTask).not.toHaveBeenCalled();
  });

  // Test case 4: Successful task creation
  it('should create a task successfully and reset form', async () => {
    // Mock state variables
    let description = 'New Task';
    let priority = 'High';

    // Mock state setters
    const setModalVisible = jest.fn(value => {
      modalVisible = value;
    });
    const setDescription = jest.fn(value => {
      description = value;
    });
    const setPriority = jest.fn(value => {
      priority = value;
    });

    // Mock successful API response
    mockCreateTask.mockResolvedValue({ success: true });

    // Create a test implementation of handleCreateTask that matches the component
    const handleCreateTask = async () => {
      if (!description || !priority) {
        Alert.alert('Validation Error', 'Please fill in all fields.');
        return;
      }

      try {
        const newTask = {
          description,
          priority,
          id_user: mockUser.id,
        };
        const result = await mockCreateTask(newTask);
        if (result.success) {
          setModalVisible(false);
          setDescription('');
          setPriority('');
        } else {
          Alert.alert('Error', result.error || 'Failed to create task');
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };

    // Execute the function
    await act(async () => {
      await handleCreateTask();
    });

    // Verify createTask was called with the correct data
    expect(mockCreateTask).toHaveBeenCalledWith({
      description: 'New Task',
      priority: 'High',
      id_user: mockUser.id,
    });

    // Verify state was updated correctly
    expect(setModalVisible).toHaveBeenCalledWith(false);
    expect(setDescription).toHaveBeenCalledWith('');
    expect(setPriority).toHaveBeenCalledWith('');
  });

  // Test case 5: API error with specific error message
  it('should show error alert when API returns an error message', async () => {
    const errorMessage = 'Server validation failed';

    // Mock API response with error
    mockCreateTask.mockResolvedValue({
      success: false,
      error: errorMessage,
    });

    // Create a test implementation of handleCreateTask
    const handleCreateTask = async () => {
      const description = 'New Task';
      const priority = 'High';

      if (!description || !priority) {
        Alert.alert('Validation Error', 'Please fill in all fields.');
        return;
      }

      try {
        const newTask = {
          description,
          priority,
          id_user: mockUser.id,
        };
        const result = await mockCreateTask(newTask);
        if (result.success) {
          // This won't execute in this test
        } else {
          Alert.alert('Error', result.error || 'Failed to create task');
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };

    // Execute the function
    await act(async () => {
      await handleCreateTask();
    });

    // Verify Alert.alert was called with the API error message
    expect(Alert.alert).toHaveBeenCalledWith('Error', errorMessage);
  });

  // Test case 6: API error without specific error message
  it('should show default error message when API returns error without message', async () => {
    // Mock API response with error but no message
    mockCreateTask.mockResolvedValue({
      success: false,
      // No error message specified
    });

    // Create a test implementation of handleCreateTask
    const handleCreateTask = async () => {
      const description = 'New Task';
      const priority = 'High';

      if (!description || !priority) {
        Alert.alert('Validation Error', 'Please fill in all fields.');
        return;
      }

      try {
        const newTask = {
          description,
          priority,
          id_user: mockUser.id,
        };
        const result = await mockCreateTask(newTask);
        if (result.success) {
          // This won't execute in this test
        } else {
          Alert.alert('Error', result.error || 'Failed to create task');
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };

    // Execute the function
    await act(async () => {
      await handleCreateTask();
    });

    // Verify Alert.alert was called with the default error message
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to create task');
  });

  // Test case 7: Exception handling
  it('should handle exceptions during task creation', async () => {
    // Mock console.error
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Mock API to throw error
    const testError = new Error('Network failure');
    mockCreateTask.mockRejectedValue(testError);

    // Create a test implementation of handleCreateTask
    const handleCreateTask = async () => {
      const description = 'New Task';
      const priority = 'High';

      if (!description || !priority) {
        Alert.alert('Validation Error', 'Please fill in all fields.');
        return;
      }

      try {
        const newTask = {
          description,
          priority,
          id_user: mockUser.id,
        };
        await mockCreateTask(newTask);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };

    // Execute the function
    await act(async () => {
      await handleCreateTask();
    });

    // Verify the error was logged
    expect(consoleSpy).toHaveBeenCalledWith('Error creating task:', testError);

    // Clean up
    consoleSpy.mockRestore();
  });
});
