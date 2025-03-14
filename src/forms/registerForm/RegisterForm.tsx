import { Button, InputGroup } from '@blueprintjs/core';
import { useAuthorization } from '../../contexts/authorizationContext/useAuthorization';
import PasswordField from '../../components/PasswordField';
import useRegister, { RegisterFormKey } from './useRegister';

const RegisterForm = () => {
  const { register, registerLoading } = useAuthorization();
  const { userInput, onChangeField, hasErrors } = useRegister();

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
        onValueChange={(val) => onChangeField(RegisterFormKey.USERNAME, val)}
      />
      <InputGroup
        placeholder="Email"
        value={userInput.values.email}
        onValueChange={(val) => onChangeField(RegisterFormKey.EMAIL, val)}
      />
      <PasswordField
        value={userInput.values.password}
        onValueChange={(val) => onChangeField(RegisterFormKey.PASSWORD, val)}
      />
      <PasswordField
        value={userInput.values.confirmPassword}
        onValueChange={(val) =>
          onChangeField(RegisterFormKey.CONFIRM_PASSWORD, val)
        }
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
