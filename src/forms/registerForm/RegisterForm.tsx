import { Button, InputGroup } from '@blueprintjs/core';
import { useAuthorization } from '../../contexts/authorizationContext/useAuthorization';
import PasswordField from '../../components/PasswordField';
import useRegisterForm from './useRegisterForm';

const RegisterForm = () => {
  const { register, registerLoading } = useAuthorization();
  const { userInput, onChangeField, hasErrors } = useRegisterForm();

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register({
      username: userInput.values.username,
      email: userInput.values.email,
      password: userInput.values.password,
    });
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      onSubmit={onRegister}
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
      <PasswordField
        value={userInput.values.confirmPassword}
        onValueChange={(val) => onChangeField('confirmPassword', val)}
      />
      <Button
        outlined
        type="submit"
        loading={registerLoading}
        disabled={hasErrors}
        text="Register"
      />
    </form>
  );
};

export default RegisterForm;
