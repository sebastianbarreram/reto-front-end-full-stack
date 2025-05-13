import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { ProfileScreen } from '../../../src/modules/Profile/screens/ProfileScreen';
import { AuthContext } from '../../../src/modules/Login/context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../src/redux/slices/UserSlice';

// Create a spy on Alert.alert for tracking calls
const alertSpy = jest.spyOn(Alert, 'alert');

// Mock logout action
jest.mock('../../../src/redux/slices/UserSlice', () => ({
  logout: jest.fn().mockReturnValue({ type: 'user/logout' }),
}));

// Mock navigation object
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mock route object
const mockRoute = {
  key: 'profile-screen',
  name: 'Profile',
  params: {},
};

describe('ProfileScreen', () => {
  const mockUser = {
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.jpg',
    isAuthenticated: true,
    created_at: '2023-01-01T00:00:00.000Z',
  };

  const mockAuthContext = {
    user: mockUser,
    logout: jest.fn(),
    updateUser: jest.fn(),
  };

  // Mock Redux state
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear the Alert mock for each test
    alertSpy.mockClear();

    // Setup Redux mocks before each test
    (useSelector as unknown as jest.Mock).mockImplementation(selector => {
      const mockState = {
        user: {
          user: mockUser,
        },
        tasks: {
          tasks: [],
        },
      };
      return selector(mockState);
    });

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('renders user profile information correctly', async () => {
    const { getByText, getByTestId, getAllByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfileScreen
          navigation={mockNavigation as any}
          route={mockRoute as any}
        />
      </AuthContext.Provider>,
    );

    await waitFor(() => {
      // Check for email information
      expect(getByText('Email')).toBeTruthy();
      expect(getAllByText(/test@example.com/)[0]).toBeTruthy();
      expect(getAllByText(/test@example.com/)[1]).toBeTruthy();
      expect(getAllByText(/test@example.com/)[2]).not.toBeTruthy();

      // Check for member since information
      expect(getByText('Member Since')).toBeTruthy();

      // Check for tasks created information
      expect(getByText('Tasks Created')).toBeTruthy();
      expect(getByText('0')).toBeTruthy(); // Should show 0 since our mock has empty tasks array

      // Check for logout functionality
      const logoutButtonElement = getByTestId('logout-button');
      expect(logoutButtonElement).toBeTruthy();
    });
  });

  it('navigates to LaunchScreen when user is not authenticated', async () => {
    // Override the default mock to set isAuthenticated to false
    (useSelector as unknown as jest.Mock).mockImplementation(selector => {
      const mockState = {
        user: {
          user: {
            ...mockUser,
            isAuthenticated: false,
          },
        },
        tasks: {
          tasks: [],
        },
      };
      return selector(mockState);
    });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfileScreen
          navigation={mockNavigation as any}
          route={mockRoute as any}
        />
      </AuthContext.Provider>,
    );

    // Verify that navigation to LaunchScreen was triggered
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('LaunchScreen');
    });
  });

  it('does not navigate away when user is authenticated', async () => {
    // Explicitly set isAuthenticated to true (though it's already the default in our tests)
    (useSelector as unknown as jest.Mock).mockImplementation(selector => {
      const mockState = {
        user: {
          user: {
            ...mockUser,
            isAuthenticated: true,
          },
        },
        tasks: {
          tasks: [],
        },
      };
      return selector(mockState);
    });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <ProfileScreen
          navigation={mockNavigation as any}
          route={mockRoute as any}
        />
      </AuthContext.Provider>,
    );

    // Verify navigation was NOT called with LaunchScreen
    await waitFor(() => {
      expect(mockNavigation.navigate).not.toHaveBeenCalledWith('LaunchScreen');
    });
  });

  describe('Logout button functionality', () => {
    it('shows confirmation dialog when logout button is pressed', async () => {
      const { getByTestId } = render(
        <AuthContext.Provider value={mockAuthContext}>
          <ProfileScreen
            navigation={mockNavigation as any}
            route={mockRoute as any}
          />
        </AuthContext.Provider>,
      );

      // Find and press the logout button
      const logoutButton = await waitFor(() => getByTestId('logout-button'));
      fireEvent.press(logoutButton);

      // Verify Alert.alert was called with the right arguments
      expect(alertSpy).toHaveBeenCalledWith(
        'Logout',
        'Are you sure you want to sign out?',
        expect.arrayContaining([
          expect.objectContaining({ text: 'Cancel' }),
          expect.objectContaining({ text: 'Yes, sign out' }),
        ]),
      );
    });

    it('dispatches logout action when confirmation is accepted', async () => {
      const { getByTestId } = render(
        <AuthContext.Provider value={mockAuthContext}>
          <ProfileScreen
            navigation={mockNavigation as any}
            route={mockRoute as any}
          />
        </AuthContext.Provider>,
      );

      // Find and press the logout button
      const logoutButton = await waitFor(() => getByTestId('logout-button'));
      fireEvent.press(logoutButton);

      // Get the "Yes, sign out" action from the Alert mock
      const confirmAction = alertSpy.mock.calls[0]?.[2]?.find(
        (button: any) => button.text === 'Yes, sign out',
      );

      // Simulate pressing the confirm button
      if (confirmAction && typeof confirmAction.onPress === 'function') {
        confirmAction.onPress();
      }

      // Verify logout action was dispatched
      expect(logout).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalled();
    });

    it('does not dispatch logout action when confirmation is cancelled', async () => {
      const { getByTestId } = render(
        <AuthContext.Provider value={mockAuthContext}>
          <ProfileScreen
            navigation={mockNavigation as any}
            route={mockRoute as any}
          />
        </AuthContext.Provider>,
      );

      // Find and press the logout button
      const logoutButton = await waitFor(() => getByTestId('logout-button'));
      fireEvent.press(logoutButton);

      // Get the "Cancel" action from the Alert mock
      const cancelAction = alertSpy.mock.calls[0]?.[2]?.find(
        (button: any) => button.text === 'Cancel',
      );

      // Simulate pressing the cancel button
      if (cancelAction && cancelAction.onPress) {
        cancelAction.onPress();
      }

      // Verify logout action was NOT dispatched
      expect(logout).not.toHaveBeenCalled();
    });
  });
});
