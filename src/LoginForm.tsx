import { Button, InputGroup } from '@blueprintjs/core';
import { useState } from 'react';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';

export type LoginUserInput = {
  username: string;
  email: string;
  password: string;
};

const useLoginForm = () => {
  const [userInput, setUserInput] = useState<LoginUserInput>({
    username: '',
    email: '',
    password: '',
  });

  const onChangeField = (key: string, value: string) =>
    setUserInput((prev) => ({ ...prev, [key]: value }));

  return {
    userInput,
    onChangeField,
  };
};

const LoginForm = () => {
  const { login, loginLoading } = useAuthorization();
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
        value={userInput.username}
        onValueChange={(val) => onChangeField('username', val)}
      />
      <InputGroup
        placeholder="Email"
        value={userInput.email}
        onValueChange={(val) => onChangeField('email', val)}
      />
      <InputGroup
        placeholder="Password"
        value={userInput.password}
        onValueChange={(val) => onChangeField('password', val)}
      />
      <Button outlined type="submit" loading={loginLoading}>
        LOGIN
      </Button>
    </form>
  );
};

export default LoginForm;
