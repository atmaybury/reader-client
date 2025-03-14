import { Button, InputGroup } from '@blueprintjs/core';
import { useAuthorization } from '../../contexts/authorizationContext/useAuthorization';
import PasswordField from '../../components/PasswordField';
import useLogin, { LoginFormKey } from './useLogin';

const LoginForm = () => {
  const { login, loginLoading, loginError } = useAuthorization();
  const { userInput, onChangeField, hasErrors } = useLogin();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      username: userInput.values.username,
      email: userInput.values.email,
      password: userInput.values.password,
    });
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      onSubmit={onLogin}
    >
      <InputGroup
        placeholder="Username"
        value={userInput.values.username}
        onValueChange={(val) => onChangeField(LoginFormKey.USERNAME, val)}
      />
      <InputGroup
        placeholder="Email"
        value={userInput.values.email}
        onValueChange={(val) => onChangeField(LoginFormKey.EMAIL, val)}
      />
      <PasswordField
        value={userInput.values.password}
        onValueChange={(val) => onChangeField(LoginFormKey.PASSWORD, val)}
      />
      <Button
        outlined
        type="submit"
        loading={loginLoading}
        disabled={hasErrors}
        text="Login"
      />
      {loginError && <h4>{loginError.message}</h4>}
    </form>
  );
};

export default LoginForm;
