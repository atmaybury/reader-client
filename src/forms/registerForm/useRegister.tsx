import { useReducer } from 'react';
import { validateEmail } from '../../core/helpers';

export enum RegisterFormKey {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export type RegisterFormState = {
  values: {
    [key in RegisterFormKey]: string;
  };
  errors: {
    [key in RegisterFormKey]?: string;
  };
};

export const defaultRegisterFormState: RegisterFormState = {
  values: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  errors: {},
};

type UpdateUsernameAction = {
  type: 'UPDATE_USERNAME';
  payload: string;
};

type UpdateEmailAction = {
  type: 'UPDATE_EMAIL';
  payload: string;
};

type UpdatePasswordAction = {
  type: 'UPDATE_PASSWORD';
  payload: string;
};

type UpdateConfirmPasswordAction = {
  type: 'UPDATE_CONFIRM_PASSWORD';
  payload: string;
};

type RegisterFormReducerAction =
  | UpdateUsernameAction
  | UpdateEmailAction
  | UpdatePasswordAction
  | UpdateConfirmPasswordAction;

export const registerFormReducer = (
  state: RegisterFormState,
  action: RegisterFormReducerAction,
) => {
  switch (action.type) {
    case 'UPDATE_USERNAME':
      return {
        values: { ...state.values, username: action.payload },
        errors: { ...state.errors, username: undefined },
      };
    case 'UPDATE_EMAIL':
      return {
        values: { ...state.values, email: action.payload },
        errors: { ...state.errors, email: validateEmail(action.payload) },
      };
    case 'UPDATE_PASSWORD':
      return {
        values: { ...state.values, password: action.payload },
        errors: { ...state.errors, password: undefined },
      };
    case 'UPDATE_CONFIRM_PASSWORD':
      return {
        values: { ...state.values, confirmPassword: action.payload },
        errors: { ...state.errors, confirmPassword: undefined },
      };
    default:
      return state;
  }
};

const useRegister = () => {
  const [state, dispatch] = useReducer(
    registerFormReducer,
    defaultRegisterFormState,
  );

  const onChangeField = (key: RegisterFormKey, value: string) => {
    switch (key) {
      case 'username':
        dispatch({ type: 'UPDATE_USERNAME', payload: value });
        break;
      case 'email':
        dispatch({ type: 'UPDATE_EMAIL', payload: value });
        break;
      case 'password':
        dispatch({ type: 'UPDATE_PASSWORD', payload: value });
        break;
      case 'confirmPassword':
        dispatch({ type: 'UPDATE_CONFIRM_PASSWORD', payload: value });
        break;
      default:
        return;
    }
  };

  const valid =
    !Object.values(state.errors).some(Boolean) &&
    !Object.values(state.values).some((v) => v === '');

  return {
    formState: state,
    onChangeField,
    valid,
  };
};

export default useRegister;
