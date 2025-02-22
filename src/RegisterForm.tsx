import { Button, InputGroup } from '@blueprintjs/core';
import config from './config';
import { useState } from 'react';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';

type RegisterUserInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SubmitUserInput = Omit<RegisterUserInput, 'confirmPassword'>;

const useRegisterForm = () => {
  const [userInput, setUserInput] = useState<RegisterUserInput>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeField = (key: string, value: string) =>
    setUserInput((prev) => ({ ...prev, [key]: value }));

  return {
    userInput,
    onChangeField,
  };
};

const RegisterForm = () => {
  const { login } = useAuthorization();
  const { userInput, onChangeField } = useRegisterForm();

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input: SubmitUserInput = {
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
    };

    try {
      const res = await fetch(`${config.API_PATH}/register`, {
        method: 'POST',
        body: JSON.stringify(input),
      });
      if (!res.ok) throw Error(`Got statusCode ${res.status}`);

      const string = await res.text();
      console.log('RESPONSE: ', string);
      login(string);
    } catch (e) {
      console.error(`Error logging in: ${e}`);
    }
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      onSubmit={onRegister}
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
      <InputGroup
        placeholder="Confim Password"
        value={userInput.confirmPassword}
        onValueChange={(val) => onChangeField('confirmPassword', val)}
      />
      <Button type="submit">REGISTER</Button>
    </form>
  );
};

export default RegisterForm;
