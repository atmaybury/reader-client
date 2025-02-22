import { Button, InputGroup } from '@blueprintjs/core';
import config from './config';
import { useState } from 'react';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';

type LoginUserInput = {
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
  const { login } = useAuthorization();
  const { userInput, onChangeField } = useLoginForm();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${config.API_PATH}/login`, {
        method: 'POST',
        body: JSON.stringify(userInput),
      });
      if (!res.ok) throw Error(`Got statusCode ${res.status}`);

      const string = await res.text();
      login(string);
    } catch (e) {
      console.error(`Error logging in: ${e}`);
    }
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
      <Button type="submit">LOGIN</Button>
    </form>
  );
};

export default LoginForm;
