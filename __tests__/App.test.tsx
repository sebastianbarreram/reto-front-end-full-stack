/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native';

jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    NavigationContainer: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

jest.mock('../src/navigation/RootStack', () => {
  return {
    __esModule: true,
    default: () => <></>,
  };
});

// Add a store mock
jest.mock(
  '../src/store',
  () => ({
    store: {
      getState: () => ({}),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    },
  }),
  { virtual: true },
);

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
      const result = render(<App />);
      expect(result).toBeTruthy();
  });
  it('matches snapshot', () => {
    const { toJSON } = render(<App />);
    // Update the snapshot by adding an assertion
    expect(toJSON()).toMatchSnapshot();
  });
});
