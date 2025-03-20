import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  RenderOptions,
  screen,
} from '@testing-library/react';
import RegisterForm from './RegisterForm';
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
    renderWithWrapper(<RegisterForm />);

    const inputElement = screen.getByLabelText(labelText) as HTMLInputElement;
    expect(inputElement.value).toBe('');
  });

  it('updates on input', async () => {
    renderWithWrapper(<RegisterForm />);

    const inputElement = screen.getByLabelText(labelText) as HTMLInputElement;
    const testString = 'string';

    fireEvent.change(inputElement, { target: { value: testString } });
    expect(inputElement.value).toBe(testString);
  });
};

afterEach(() => {
  cleanup();
});

describe('Username', () => {
  runBasicInputTests('Username');
});

describe('Email', () => {
  runBasicInputTests('Email');
});

describe('Password', () => {
  runBasicInputTests('Password');
});

describe('Confirm password', () => {
  runBasicInputTests('Confirm password');
});

const mockRegister = vi.fn();
vi.mock('../../contexts/authorizationContext/useAuthorization', () => ({
  useAuthorization: () => ({
    register: mockRegister,
    registerLoading: false,
    registerError: null,
  }),
}));

describe('submitting', () => {
  it('submit button is disabled with default form values', () => {
    renderWithWrapper(<RegisterForm />);

    const button = screen.getByRole('button', {
      name: 'Register',
    }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);

    fireEvent.click(button);
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('submits the form with correct form values', () => {
    renderWithWrapper(<RegisterForm />);

    // Simulate user input
    const testUserInput = {
      username: 'testuser',
      email: 'test@test.com',
      password: 'testpassword',
      confirmPassword: 'testpassword',
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
    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: testUserInput.password },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    // Assert that the login function was called with the correct values
    expect(mockRegister).toHaveBeenCalledWith({
      username: testUserInput.username,
      email: testUserInput.email,
      password: testUserInput.password,
    });
  });
});
