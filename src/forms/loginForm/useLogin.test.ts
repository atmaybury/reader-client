import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useLogin, {
  defaultLoginUserState,
  LoginFormKey,
  loginFormReducer,
} from './useLogin';

describe('useLogin hook', () => {
  describe('initial state', () => {
    it('returns the default state initially', () => {
      const { result } = renderHook(() => useLogin());

      expect(result.current.userInput).toBe(defaultLoginUserState);
    });

    it('hasErrors is false initially', () => {
      const { result } = renderHook(() => useLogin());

      expect(result.current.hasErrors).toBe(false);
    });
  });

  describe('username field', () => {
    it('updates the username value on input', () => {
      const { result } = renderHook(() => useLogin());

      const usernameInput = 'username';

      act(() => {
        result.current.onChangeField(LoginFormKey.USERNAME, usernameInput);
      });
      expect(result.current.userInput.values.username).toBe(usernameInput);
    });
  });

  describe('email field', () => {
    it('updates the email value on input', () => {
      const { result } = renderHook(() => useLogin());

      const emailInput = 'test@test.test';

      act(() => {
        result.current.onChangeField(LoginFormKey.EMAIL, emailInput);
      });
      expect(result.current.userInput.values.email).toBe(emailInput);
    });

    it('raises an error on invalid email, clears on valid', () => {
      const { result } = renderHook(() => useLogin());

      const badEmailInput = 'test@test';
      const goodEmailInput = 'test@test.com';

      act(() => {
        result.current.onChangeField(LoginFormKey.EMAIL, badEmailInput);
      });
      expect(result.current.userInput.errors.email).toBeDefined();

      act(() => {
        result.current.onChangeField(LoginFormKey.EMAIL, goodEmailInput);
      });
      expect(result.current.userInput.errors.email).toBeUndefined();
    });

    it('hasErrors returns true when error present, false when none present', () => {
      const { result } = renderHook(() => useLogin());

      const badEmailInput = 'test@test';
      const goodEmailInput = 'test@test.com';

      act(() => {
        result.current.onChangeField(LoginFormKey.EMAIL, badEmailInput);
      });
      expect(result.current.hasErrors).toBe(true);

      act(() => {
        result.current.onChangeField(LoginFormKey.EMAIL, goodEmailInput);
      });
      expect(result.current.hasErrors).toBe(false);
    });
  });

  describe('password field', () => {
    it('updates the password value on input', () => {
      const { result } = renderHook(() => useLogin());

      const passwordInput = 'password';

      act(() => {
        result.current.onChangeField(LoginFormKey.PASSWORD, passwordInput);
      });
      expect(result.current.userInput.values.password).toBe(passwordInput);
    });
  });

  it('invalid onChangeField key ignored', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.onChangeField('invalidKey' as LoginFormKey, 'test');
    });
    expect(result.current.userInput).toBe(defaultLoginUserState);
  });

  it('loginReducer default case for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
    const newState = loginFormReducer(defaultLoginUserState, unknownAction);

    expect(newState).toEqual(defaultLoginUserState);
  });
});
