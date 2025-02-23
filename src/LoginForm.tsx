import { Button, InputGroup } from '@blueprintjs/core';
import { useReducer } from 'react';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';
import PasswordField from './components/PasswordField';
import { validateEmail } from './core/helpers';

export type LoginFormState = {
  username: {
    value: string;
    error?: string;
  };
  email: {
    value: string;
    error?: string;
  };
  password: {
    value: string;
    error?: string;
  };
};

type LoginFormKey = keyof LoginFormState;

const defaultLoginUserState: LoginFormState = {
  username: {
    value: '',
    error: undefined,
  },
  email: {
    value: '',
    error: undefined,
  },
  password: {
    value: '',
    error: undefined,
  },
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
        ...state,
        username: {
          value: action.payload,
          error: undefined,
        },
      };
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: {
          value: action.payload,
          error: validateEmail(action.payload),
        },
      };
    case 'UPDATE_PASSWORD':
      return {
        ...state,
        password: { value: action.payload, error: undefined },
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

const LoginForm = () => {
  const { login, loginLoading, loginError } = useAuthorization();
  const { userInput, onChangeField } = useLoginForm();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(userInput);
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      onSubmit={onLogin}
    >
      <InputGroup
        placeholder="Username"
        value={userInput.username.value}
        onValueChange={(val) => onChangeField('username', val)}
      />
      <InputGroup
        placeholder="Email"
        value={userInput.email.value}
        onValueChange={(val) => onChangeField('email', val)}
      />
      <PasswordField
        value={userInput.password.value}
        onValueChange={(val) => onChangeField('password', val)}
      />
      <Button outlined type="submit" loading={loginLoading}>
        LOGIN
      </Button>
      {loginError && <h4>{loginError.message}</h4>}
    </form>
  );
};

export default LoginForm;
