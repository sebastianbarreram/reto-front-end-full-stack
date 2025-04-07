import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { LoginScreen } from '../../../../src/modules/Login/screens/LoginScreen';
import { useAuth } from '../../../../src/modules/Login/hooks/useAuth';
import { useEmailValidation } from '../../../../src/shared/hooks/useEmailValidation';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock(
  'react-native-vector-icons/MaterialCommunityIcons',
  () => 'IconComunity',
);

jest.mock('../../../../src/modules/Login/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../../../src/shared/hooks/useEmailValidation', () => ({
  useEmailValidation: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

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
    const expectedInstructionText = 'Login or sign up for free';

    const { getByText, getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByText(expectedInstructionText)).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('LOGIN')).toBeDisabled();
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
  });

  it('should enable login button when form is valid', async () => {
    const validEmail = 'test@example.com';
    const validPassword = 'password123';

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Email'), validEmail);
      fireEvent.changeText(getByPlaceholderText('Password'), validPassword);
    });

    expect(getByText('LOGIN')).not.toBeDisabled();
  });

  it('should keep login button disabled when email is invalid', async () => {
    const invalidEmail = 'invalid-email';
    const validPassword = 'password123';
    const expectedErrorMessage = 'Invalid email format';

    (useEmailValidation as jest.Mock).mockReturnValue({
      errorMessage: expectedErrorMessage,
      validateEmail: jest.fn(),
    });

    const { getByPlaceholderText, getByText, queryByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Email'), invalidEmail);
      fireEvent.changeText(getByPlaceholderText('Password'), validPassword);
    });

    expect(queryByText(expectedErrorMessage)).toBeTruthy();
    expect(getByText('LOGIN')).toBeDisabled();
  });

  it('should display loading indicator when login is in progress', async () => {
    const validEmail = 'test@example.com';
    const validPassword = 'password123';
    const expectedLoadingState = true;

    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn().mockResolvedValue(undefined),
      loading: expectedLoadingState,
    });

    const { getByPlaceholderText, queryByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Email'), validEmail);
      fireEvent.changeText(getByPlaceholderText('Password'), validPassword);
    });

    expect(queryByText('LOGIN')).toBeNull();
  });

  it('should call login function with correct parameters when login button is pressed', async () => {
    const validEmail = 'test@example.com';
    const validPassword = 'password123';
    const mockLogin = jest.fn().mockResolvedValue(undefined);

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      loading: false,
    });

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Email'), validEmail);
      fireEvent.changeText(getByPlaceholderText('Password'), validPassword);
    });
    expect(getByText('LOGIN')).not.toBeDisabled();

    fireEvent.press(getByText('LOGIN'));


    // Verify login was called with correct parameters
    expect(mockLogin).toHaveBeenCalledWith(
      validEmail,
      validPassword,
      mockNavigation,
    );
  });

  it('should show alert when login fails', async () => {
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

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    // Fill in the form fields
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Email'), validEmail);
      fireEvent.changeText(getByPlaceholderText('Password'), validPassword);
    });

    // Press the login button separately to better handle the promise rejection
    await act(async () => {
      fireEvent.press(getByText('LOGIN'));
    });

    // Wait for the promise rejection to be processed
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Login error',
        expectedErrorMessage,
      );
    });
  });

  it('should navigate to SignUpScreen when Sign Up link is pressed', async () => {
    const expectedScreen = 'SignUpScreen';

    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    await act(async () => {
      fireEvent.press(getByText('Sign Up'));
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith(expectedScreen);
  });

  it('should validate email when email input changes', async () => {
    const testEmail = 'test@example.com';
    const mockValidateEmail = jest.fn();

    (useEmailValidation as jest.Mock).mockReturnValue({
      errorMessage: '',
      validateEmail: mockValidateEmail,
    });

    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Email'), testEmail);
    });

    expect(mockValidateEmail).toHaveBeenCalledWith(testEmail);
  });

  it('should show generic error message when login error has no message', async () => {
    const validEmail = 'test@example.com';
    const validPassword = 'password123';
    const expectedGenericErrorMessage =
      'An unexpected error occurred. Please try logging in again';
    const mockLogin = jest.fn().mockRejectedValue({});

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      loading: false,
    });

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    // Fill in the form fields
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Email'), validEmail);
      fireEvent.changeText(getByPlaceholderText('Password'), validPassword);
    });

    // Press the login button separately to better handle the promise rejection
    await act(async () => {
      fireEvent.press(getByText('LOGIN'));
    });

    // Wait for the promise rejection to be processed with increased timeout
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Login error',
        expectedGenericErrorMessage,
      );
    });
  });

  it('should have password input initially hidden', async () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const passwordInput = getByPlaceholderText('Password');

    // Password should be hidden initially (secureTextEntry = true)
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });

  it('should toggle password visibility when eye icon is pressed', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <LoginScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const passwordInput = getByPlaceholderText('Password');

    // Password should be hidden initially (secureTextEntry = true)
    expect(passwordInput.props.secureTextEntry).toBe(true);

    // Find the eye icon button by testID
    const eyeIconButton = getByTestId('toggle-password-visibility');

    // Press the eye icon to show password
    await act(async () => {
      fireEvent.press(eyeIconButton);
    });

    // Check that password is now visible
    expect(passwordInput.props.secureTextEntry).toBe(false);

    // Press the eye icon again to hide password
    await act(async () => {
      fireEvent.press(eyeIconButton);
    });

    // Password should be hidden again (secureTextEntry = true)
    expect(passwordInput.props.secureTextEntry).toBe(true);
  });
});
