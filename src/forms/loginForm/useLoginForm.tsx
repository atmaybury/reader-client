import { useReducer } from 'react';
import { validateEmail } from '../../core/helpers';

type LoginFormKey = 'username' | 'email' | 'password';

export type LoginFormState = {
  values: {
    [key in LoginFormKey]: string;
  };
  errors: {
    [key in LoginFormKey]?: string;
  };
};

const defaultLoginUserState: LoginFormState = {
  values: {
    username: '',
    email: '',
    password: '',
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

type LoginFormReducerAction =
  | UpdateUsernameAction
  | UpdateEmailAction
  | UpdatePasswordAction;

const loginFormReducer = (
  state: LoginFormState,
  action: LoginFormReducerAction,
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
    default:
      return state;
  }
};

const useLoginForm = () => {
  const [state, dispatch] = useReducer(loginFormReducer, defaultLoginUserState);

  const onChangeField = (key: LoginFormKey, value: string) => {
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
      default:
        return;
    }
  };

  return {
    userInput: state,
    onChangeField,
  };
};

export default useLoginForm;
