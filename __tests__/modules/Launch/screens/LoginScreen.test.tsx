import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../../../../src/modules/Login/screens/LoginScreen';
import { Alert } from 'react-native';

// Mock dependencies
jest.mock('../../../../src/modules/Login/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../../../src/shared/hooks/useEmailValidation', () => ({
  useEmailValidation: jest.fn(),
}));

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

// Mock Alert.alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

// Import mocked modules
import { useAuth } from '../../../../src/modules/Login/hooks/useAuth';
import { useEmailValidation } from '../../../../src/shared/hooks/useEmailValidation';

describe('LoginScreen', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn().mockResolvedValue(undefined),
      loading: false,
    });

    (useEmailValidation as jest.Mock).mockReturnValue({
      errorMessage: '',
      validateEmail: jest.fn(),
    });
  });

  it('should render correctly with initial state', () => {
    // Arrange
    const expectedInstructionText = 'Login or sign up for free';

    // Act
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    // Assert
    expect(getByText(expectedInstructionText)).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('LOGIN')).toBeDisabled();
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
  });

  it('should enable login button when form is valid', () => {
    // Arrange
    const validEmail = 'test@example.com';
    const validPassword = 'password123';

    // Act
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), validEmail);
    fireEvent.changeText(getByPlaceholderText('Password'), validPassword);

    // Assert
    expect(getByText('LOGIN')).not.toBeDisabled();
  });

  it('should keep login button disabled when email is invalid', () => {
    // Arrange
    const invalidEmail = 'invalid-email';
    const validPassword = 'password123';
    const expectedErrorMessage = 'Invalid email format';

    (useEmailValidation as jest.Mock).mockReturnValue({
      errorMessage: expectedErrorMessage,
      validateEmail: jest.fn(),
    });

    // Act
    const { getByPlaceholderText, getByText, queryByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), invalidEmail);
    fireEvent.changeText(getByPlaceholderText('Password'), validPassword);

    // Assert
    expect(queryByText(expectedErrorMessage)).toBeTruthy();
    expect(getByText('LOGIN')).toBeDisabled();
  });

  it('should display loading indicator when login is in progress', () => {
    // Arrange
    const validEmail = 'test@example.com';
    const validPassword = 'password123';
    const expectedLoadingState = true;

    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn().mockResolvedValue(undefined),
      loading: expectedLoadingState,
    });

    // Act
    const { getByPlaceholderText, queryByText, getByTestId } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), validEmail);
    fireEvent.changeText(getByPlaceholderText('Password'), validPassword);

    // Assert
    expect(queryByText('LOGIN')).toBeNull(); // Button should be replaced by loading indicator
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should call login function with correct parameters when login button is pressed', async () => {
    // Arrange
    const validEmail = 'test@example.com';
    const validPassword = 'password123';
    const mockLogin = jest.fn().mockResolvedValue(undefined);

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      loading: false,
    });

    // Act
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), validEmail);
    fireEvent.changeText(getByPlaceholderText('Password'), validPassword);
    fireEvent.press(getByText('LOGIN'));

    // Assert
    expect(mockLogin).toHaveBeenCalledWith(
      validEmail,
      validPassword,
      mockNavigation,
    );
  });

  it('should show alert when login fails', async () => {
    // Arrange
    const validEmail = 'test@example.com';
    const validPassword = 'password123';
    const expectedErrorMessage = 'Authentication failed';
    const mockLogin = jest
      .fn()
      .mockRejectedValue(new Error(expectedErrorMessage));

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      loading: false,
    });

    // Act
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), validEmail);
    fireEvent.changeText(getByPlaceholderText('Password'), validPassword);
    fireEvent.press(getByText('LOGIN'));

    // Assert
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Login error',
        expectedErrorMessage,
      );
    });
  });

  it('should navigate to SignUpScreen when Sign Up link is pressed', () => {
    // Arrange
    const expectedScreen = 'SignUpScreen';

    // Act
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    fireEvent.press(getByText('Sign Up'));

    // Assert
    expect(mockNavigation.navigate).toHaveBeenCalledWith(expectedScreen);
  });

  it('should validate email when email input changes', () => {
    // Arrange
    const testEmail = 'test@example.com';
    const mockValidateEmail = jest.fn();

    (useEmailValidation as jest.Mock).mockReturnValue({
      errorMessage: '',
      validateEmail: mockValidateEmail,
    });

    // Act
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), testEmail);

    // Assert
    expect(mockValidateEmail).toHaveBeenCalledWith(testEmail);
  });

  it('should show generic error message when login error has no message', async () => {
    // Arrange
    const validEmail = 'test@example.com';
    const validPassword = 'password123';
    const expectedGenericErrorMessage =
      'An unexpected error occurred. Please try logging in again';
    const mockLogin = jest.fn().mockRejectedValue({});

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      loading: false,
    });

    // Act
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    fireEvent.changeText(getByPlaceholderText('Email'), validEmail);
    fireEvent.changeText(getByPlaceholderText('Password'), validPassword);
    fireEvent.press(getByText('LOGIN'));

    // Assert
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Login error',
        expectedGenericErrorMessage,
      );
    });
  });
});
