import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { LaunchScreen } from '../../../../src/modules/Launch/screens/LaunchScreen';

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('../../../../src/shared/interfaces/MyStackScreenProps', () => ({
  MyStackScreenProps: {},
}));

jest.mock('../../../../src/shared/atoms/Logo', () => {
  return {
    __esModule: true,
    default: () => <></>,
  };
});

describe('LaunchScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(
      <LaunchScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(getByTestId('launch-screen')).toBeTruthy();
    expect(getByTestId('launch-screen-app-title')).toBeTruthy();
  });

  it('should display the app title correctly', () => {
    const { getByTestId } = render(
      <LaunchScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const titleElement = getByTestId('launch-screen-app-title');
    expect(titleElement.props.children).toBe('My App');
  });

  it('should have "My App" text in a Text component', () => {
    const { getByText, getByTestId } = render(
      <LaunchScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const myAppText = getByText('My App');
    expect(myAppText).toBeTruthy();

    // Verify it's the same element as the one with the testID
    const titleElement = getByTestId('launch-screen-app-title');
    expect(myAppText).toBe(titleElement);

    // Verify it's a Text component
    expect(myAppText.type).toBe('Text');
  });

  it('should navigate to LoginScreen after 3 seconds', async () => {
    render(
      <LaunchScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    // Fast-forward timer by 3 seconds (3000ms)
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('LoginScreen');
    });
  });

  it('should call navigation.navigate once', async () => {
    render(
      <LaunchScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    // Fast-forward timer
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    });
  });

  it('should render Logo component', () => {
    const { UNSAFE_getByType } = render(
      <LaunchScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    expect(
      UNSAFE_getByType(
        jest.requireMock('../../../../src/shared/atoms/Logo').default,
      ),
    ).toBeTruthy();
  });

  it('should apply the correct styles', () => {
    const { getByTestId } = render(
      <LaunchScreen navigation={mockNavigation as any} route={{} as any} />,
    );

    const container = getByTestId('launch-screen');
    const title = getByTestId('launch-screen-app-title');

    expect(container.props.style).toBeTruthy();
    expect(title.props.style).toBeTruthy();
  });
});
