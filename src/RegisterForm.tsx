import { Button, InputGroup } from '@blueprintjs/core';
import { useReducer } from 'react';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';
import PasswordField from './components/PasswordField';
import { validateEmail } from './core/helpers';

export type RegisterFormState = {
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
  confirmPassword: {
    value: string;
    error?: string;
  };
};

type RegisterFormKey = keyof RegisterFormState;

const defaultRegisterFormState: RegisterFormState = {
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
  confirmPassword: {
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
  };
};

const RegisterForm = () => {
  const { register, registerLoading } = useAuthorization();
  const { userInput, onChangeField } = useRegisterForm();

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register({
      username: userInput.username.value,
      email: userInput.email.value,
      password: userInput.password.value,
    });
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      onSubmit={onRegister}
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
      <PasswordField
        value={userInput.confirmPassword.value}
        onValueChange={(val) => onChangeField('confirmPassword', val)}
      />
      <Button outlined type="submit" loading={registerLoading}>
        REGISTER
      </Button>
    </form>
  );
};

export default RegisterForm;
