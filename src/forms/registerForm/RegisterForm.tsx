import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { useAuthorization } from '../../contexts/authorizationContext/useAuthorization';
import PasswordField from '../../components/PasswordField';
import useRegister, { RegisterFormKey } from './useRegister';

const RegisterForm = () => {
  const { register, registerLoading } = useAuthorization();
  const { formState, onChangeField, valid } = useRegister();

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    register({
      username: formState.values.username,
      email: formState.values.email,
      password: formState.values.password,
    });
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      onSubmit={onRegister}
    >
      <FormGroup
        helperText=""
        label="Username"
        labelFor={RegisterFormKey.USERNAME}
      >
        <InputGroup
          id={RegisterFormKey.USERNAME}
          value={formState.values.username}
          onValueChange={(val) => onChangeField(RegisterFormKey.USERNAME, val)}
        />
      </FormGroup>

      <FormGroup helperText="" label="Email" labelFor={RegisterFormKey.EMAIL}>
        <InputGroup
          id={RegisterFormKey.EMAIL}
          value={formState.values.email}
          onValueChange={(val) => onChangeField(RegisterFormKey.EMAIL, val)}
        />
      </FormGroup>

      <FormGroup
        helperText=""
        label="Password"
        labelFor={RegisterFormKey.PASSWORD}
      >
        <PasswordField
          id={RegisterFormKey.PASSWORD}
          value={formState.values.password}
          onValueChange={(val) => onChangeField(RegisterFormKey.PASSWORD, val)}
        />
      </FormGroup>

      <FormGroup
        helperText=""
        label="Confirm password"
        labelFor={RegisterFormKey.CONFIRM_PASSWORD}
      >
        <PasswordField
          id={RegisterFormKey.CONFIRM_PASSWORD}
          value={formState.values.confirmPassword}
          onValueChange={(val) =>
            onChangeField(RegisterFormKey.CONFIRM_PASSWORD, val)
          }
        />
      </FormGroup>

      <Button
        outlined
        type="submit"
        loading={registerLoading}
        disabled={!valid}
        text="Register"
      />
    </form>
  );
};

export default RegisterForm;
