import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useRegister, {
  defaultRegisterFormState,
  RegisterFormKey,
  registerFormReducer,
} from './useRegister';

describe('useRegister hook', () => {
  describe('initial state', () => {
    it('returns the default state initially', () => {
      const { result } = renderHook(() => useRegister());

      expect(result.current.formState).toBe(defaultRegisterFormState);
    });

    it('valid is false initially', () => {
      const { result } = renderHook(() => useRegister());

      expect(result.current.valid).toBe(false);
    });
  });

  describe('username field', () => {
    it('updates the username value on input', () => {
      const { result } = renderHook(() => useRegister());

      const usernameInput = 'username';

      act(() => {
        result.current.onChangeField(RegisterFormKey.USERNAME, usernameInput);
      });
      expect(result.current.formState.values.username).toBe(usernameInput);
    });
  });

  describe('email field', () => {
    it('updates the email value on input', () => {
      const { result } = renderHook(() => useRegister());

      const emailInput = 'test@test.test';

      act(() => {
        result.current.onChangeField(RegisterFormKey.EMAIL, emailInput);
      });
      expect(result.current.formState.values.email).toBe(emailInput);
    });

    it('raises an error on invalid email, clears on valid', () => {
      const { result } = renderHook(() => useRegister());

      const badEmailInput = 'test@test';
      const goodEmailInput = 'test@test.com';

      act(() => {
        result.current.onChangeField(RegisterFormKey.EMAIL, badEmailInput);
      });
      expect(result.current.formState.errors.email).toBeDefined();

      act(() => {
        result.current.onChangeField(RegisterFormKey.EMAIL, goodEmailInput);
      });
      expect(result.current.formState.errors.email).toBeUndefined();
    });

    it('valid returns false when error present, true when none present', () => {
      const { result } = renderHook(() => useRegister());

      const usernameInput = 'username';
      const badEmailInput = 'test@test';
      const goodEmailInput = 'test@test.com';
      const passwordInput = 'password';

      act(() => {
        result.current.onChangeField(RegisterFormKey.USERNAME, usernameInput);
        result.current.onChangeField(RegisterFormKey.EMAIL, badEmailInput);
        result.current.onChangeField(RegisterFormKey.PASSWORD, passwordInput);
        result.current.onChangeField(
          RegisterFormKey.CONFIRM_PASSWORD,
          passwordInput,
        );
      });
      expect(result.current.valid).toBe(false);

      act(() => {
        result.current.onChangeField(RegisterFormKey.EMAIL, goodEmailInput);
      });
      expect(result.current.valid).toBe(true);
    });
  });

  describe('password field', () => {
    it('updates the password value on input', () => {
      const { result } = renderHook(() => useRegister());

      const passwordInput = 'password';

      act(() => {
        result.current.onChangeField(RegisterFormKey.PASSWORD, passwordInput);
      });
      expect(result.current.formState.values.password).toBe(passwordInput);
    });
  });

  describe('confirm password field', () => {
    it('updates the confirm password value on input', () => {
      const { result } = renderHook(() => useRegister());

      const passwordInput = 'password';

      act(() => {
        result.current.onChangeField(
          RegisterFormKey.CONFIRM_PASSWORD,
          passwordInput,
        );
      });
      expect(result.current.formState.values.confirmPassword).toBe(
        passwordInput,
      );
    });
  });

  it('invalid onChangeField key ignored', () => {
    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.onChangeField('invalidKey' as RegisterFormKey, 'test');
    });
    expect(result.current.formState).toBe(defaultRegisterFormState);
  });

  it('registerReducer default case for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' } as any;
    const newState = registerFormReducer(
      defaultRegisterFormState,
      unknownAction,
    );

    expect(newState).toEqual(defaultRegisterFormState);
  });
});
