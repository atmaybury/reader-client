import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  RenderOptions,
  screen,
} from '@testing-library/react';
import LoginForm from './LoginForm';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const TestProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const renderWithWrapper = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: TestProvider, ...options });

const runBasicInputTests = (labelText: string) => {
  it('is initially blank', async () => {
    renderWithWrapper(<LoginForm />);

    const inputElement = screen.getByLabelText(labelText) as HTMLInputElement;
    expect(inputElement.value).toBe('');
  });

  it('updates on input', async () => {
    renderWithWrapper(<LoginForm />);

    const inputElement = screen.getByLabelText(labelText) as HTMLInputElement;
    const testString = 'string';

    fireEvent.change(inputElement, { target: { value: testString } });
    expect(inputElement.value).toBe(testString);
  });
};

afterEach(() => {
  cleanup();
});

describe('Username input', () => {
  runBasicInputTests('Username');
});

describe('Email input', () => {
  runBasicInputTests('Email');
});

describe('Password input', () => {
  runBasicInputTests('Password');
});

const mockLogin = vi.fn();
vi.mock('../../contexts/authorizationContext/useAuthorization', () => ({
  useAuthorization: () => ({
    login: mockLogin,
    loginLoading: false,
    loginError: null,
  }),
}));

describe('submitting', () => {
  it('submit button is disabled with default form values', () => {
    renderWithWrapper(<LoginForm />);

    const button = screen.getByRole('button', {
      name: 'Login',
    }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);

    fireEvent.click(button);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('submits the form with correct input values', () => {
    renderWithWrapper(<LoginForm />);

    // Simulate user input
    const testUserInput = {
      username: 'testuser',
      email: 'test@test.com',
      password: 'testpassword',
    };

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: testUserInput.username },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: testUserInput.email },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: testUserInput.password },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Assert that the login function was called with the correct values
    expect(mockLogin).toHaveBeenCalledWith(testUserInput);
  });
});
