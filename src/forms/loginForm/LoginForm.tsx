import { useAuthorization } from '../../contexts/authorizationContext/useAuthorization';
import PasswordField from '../../components/PasswordField';
import useLogin, { LoginFormKey } from './useLogin';
import { Button, Input } from '@chakra-ui/react';

const LoginForm = () => {
  const { login, loginLoading, loginError } = useAuthorization();
  const { formState, onChangeField, valid } = useLogin();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      username: formState.values.username,
      email: formState.values.email,
      password: formState.values.password,
    });
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      onSubmit={onLogin}
    >
      {/*
      <FormGroup
        helperText=""
        label="Username"
        labelFor={LoginFormKey.USERNAME}
      >
        <InputGroup
          id={LoginFormKey.USERNAME}
          value={formState.values.username}
          onValueChange={(val) => onChangeField(LoginFormKey.USERNAME, val)}
        />
      </FormGroup>
      */}
      <Input
        id={LoginFormKey.USERNAME}
        value={formState.values.username}
        onChange={(e) => onChangeField(LoginFormKey.USERNAME, e.target.value)}
      />

      {/*
      <FormGroup helperText="" label="Email" labelFor={LoginFormKey.EMAIL}>
        <InputGroup
          id={LoginFormKey.EMAIL}
          value={formState.values.email}
          onValueChange={(val) => onChangeField(LoginFormKey.EMAIL, val)}
        />
      </FormGroup>
      */}
      <Input
        id={LoginFormKey.EMAIL}
        value={formState.values.email}
        onChange={(e) => onChangeField(LoginFormKey.EMAIL, e.target.value)}
      />

      {/*
      <FormGroup
        helperText=""
        label="Password"
        labelFor={LoginFormKey.PASSWORD}
      >
        <PasswordField
          id={LoginFormKey.PASSWORD}
          value={formState.values.password}
          onValueChange={(val) => onChangeField(LoginFormKey.PASSWORD, val)}
        />
      </FormGroup>
      */}
      <PasswordField
        id={LoginFormKey.PASSWORD}
        value={formState.values.password}
        onChange={(e) => onChangeField(LoginFormKey.PASSWORD, e.target.value)}
      />

      <Button type="submit" loading={loginLoading} disabled={!valid}>
        Login
      </Button>
      {loginError && <h4>{loginError.message}</h4>}
    </form>
  );
};

export default LoginForm;
