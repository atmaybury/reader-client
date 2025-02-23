import { Button, InputGroup } from '@blueprintjs/core';
import { useAuthorization } from '../../contexts/authorizationContext/useAuthorization';
import PasswordField from '../../components/PasswordField';
import useLoginForm from './useLoginForm';

const LoginForm = () => {
  const { login, loginLoading, loginError } = useAuthorization();
  const { userInput, onChangeField } = useLoginForm();

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
        onValueChange={(val) => onChangeField('username', val)}
      />
      <InputGroup
        placeholder="Email"
        value={userInput.values.email}
        onValueChange={(val) => onChangeField('email', val)}
      />
      <PasswordField
        value={userInput.values.password}
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
