import { useReducer } from 'react';
import { validateEmail } from '../../core/helpers';

type RegisterFormKey = 'username' | 'email' | 'password' | 'confirmPassword';

export type RegisterFormState = {
  values: {
    [key in RegisterFormKey]: string;
  };
  errors: {
    [key in RegisterFormKey]?: string;
  };
};

const defaultRegisterFormState: RegisterFormState = {
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

const registerFormReducer = (
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

const useRegisterForm = () => {
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

  return {
    userInput: state,
    onChangeField,
    hasErrors: Object.values(state.errors).some(Boolean),
  };
};

export default useRegisterForm;
