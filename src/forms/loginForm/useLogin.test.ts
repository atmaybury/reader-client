import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useLogin, {
  defaultLoginFormState,
  LoginFormKey,
  loginFormReducer,
} from './useLogin';

describe('useLogin hook', () => {
  describe('initial state', () => {
    it('returns the default state initially', () => {
      const { result } = renderHook(() => useLogin());

      expect(result.current.formState).toBe(defaultLoginFormState);
    });

    it('valid is false initially', () => {
      const { result } = renderHook(() => useLogin());

      expect(result.current.valid).toBe(false);
    });
  });

  describe('email field', () => {
    it('updates the email value on input', () => {
      const { result } = renderHook(() => useLogin());

      const emailInput = 'test@test.test';

      act(() => {
        result.current.onChangeField(LoginFormKey.EMAIL, emailInput);
      });
      expect(result.current.formState.values.email).toBe(emailInput);
    });

    it('raises an error on invalid email, clears on valid', () => {
      const { result } = renderHook(() => useLogin());

      const badEmailInput = 'test@test';
      const goodEmailInput = 'test@test.com';

      act(() => {
        result.current.onChangeField(LoginFormKey.EMAIL, badEmailInput);
      });
      expect(result.current.formState.errors.email).toBeDefined();

      act(() => {
        result.current.onChangeField(LoginFormKey.EMAIL, goodEmailInput);
      });
      expect(result.current.formState.errors.email).toBeUndefined();
    });

    it('valid returns false when error present, true when none present', () => {
      const { result } = renderHook(() => useLogin());

      const badEmailInput = 'test@test';
      const goodEmailInput = 'test@test.com';
      const passwordInput = 'password';

      act(() => {
        result.current.onChangeField(LoginFormKey.EMAIL, badEmailInput);
        result.current.onChangeField(LoginFormKey.PASSWORD, passwordInput);
      });
      expect(result.current.valid).toBe(false);

      act(() => {
        result.current.onChangeField(LoginFormKey.EMAIL, goodEmailInput);
      });
      expect(result.current.valid).toBe(true);
    });
  });

  describe('password field', () => {
    it('updates the password value on input', () => {
      const { result } = renderHook(() => useLogin());

      const passwordInput = 'password';

      act(() => {
        result.current.onChangeField(LoginFormKey.PASSWORD, passwordInput);
      });
      expect(result.current.formState.values.password).toBe(passwordInput);
    });
  });

  it('invalid onChangeField key ignored', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.onChangeField('invalidKey' as LoginFormKey, 'test');
    });
    expect(result.current.formState).toBe(defaultLoginFormState);
  });

  it('loginReducer default case for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
    const newState = loginFormReducer(defaultLoginFormState, unknownAction);

    expect(newState).toEqual(defaultLoginFormState);
  });
});
