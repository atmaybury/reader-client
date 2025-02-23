import { Button, InputGroup } from '@blueprintjs/core';
import { useState } from 'react';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';

export type RegisterUserInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SubmitUserInput = Omit<RegisterUserInput, 'confirmPassword'>;

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
  const { register, registerLoading } = useAuthorization();
  const { userInput, onChangeField } = useRegisterForm();

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register({
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
    });
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
      <Button outlined type="submit" loading={registerLoading}>
        REGISTER
      </Button>
    </form>
  );
};

export default RegisterForm;
