import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { useAuthorization } from '../../contexts/authorizationContext/useAuthorization';
import PasswordField from '../../components/PasswordField';
import useLogin, { LoginFormKey } from './useLogin';

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

      <FormGroup helperText="" label="Email" labelFor={LoginFormKey.EMAIL}>
        <InputGroup
          id={LoginFormKey.EMAIL}
          value={formState.values.email}
          onValueChange={(val) => onChangeField(LoginFormKey.EMAIL, val)}
        />
      </FormGroup>

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

      <Button
        outlined
        type="submit"
        loading={loginLoading}
        disabled={!valid}
        text="Login"
      />
      {loginError && <h4>{loginError.message}</h4>}
    </form>
  );
};

export default LoginForm;
