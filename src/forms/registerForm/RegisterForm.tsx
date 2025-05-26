import { useAuthorization } from '../../contexts/authorizationContext/useAuthorization';
import PasswordField from '../../components/PasswordField';
import useRegister, { RegisterFormKey } from './useRegister';
import { Button, Input } from '@chakra-ui/react';

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
      {/*
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
      */}
      <Input
        id={RegisterFormKey.USERNAME}
        value={formState.values.username}
        onChange={(e) =>
          onChangeField(RegisterFormKey.USERNAME, e.target.value)
        }
      />

      {/*
      <FormGroup helperText="" label="Email" labelFor={RegisterFormKey.EMAIL}>
        <InputGroup
          id={RegisterFormKey.EMAIL}
          value={formState.values.email}
          onValueChange={(val) => onChangeField(RegisterFormKey.EMAIL, val)}
        />
      </FormGroup>
      */}
      <Input
        id={RegisterFormKey.EMAIL}
        value={formState.values.email}
        onChange={(e) => onChangeField(RegisterFormKey.EMAIL, e.target.value)}
      />

      {/*
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
      <Input
        id={RegisterFormKey.PASSWORD}
        value={formState.values.password}
        onChange={(e) =>
          onChangeField(RegisterFormKey.PASSWORD, e.target.value)
        }
      />
      */}
      <PasswordField
        id={RegisterFormKey.PASSWORD}
        value={formState.values.password}
        onChange={(e) =>
          onChangeField(RegisterFormKey.PASSWORD, e.target.value)
        }
      />

      {/*
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
      <Input
        id={RegisterFormKey.CONFIRM_PASSWORD}
        value={formState.values.confirmPassword}
        onChange={(e) =>
          onChangeField(RegisterFormKey.CONFIRM_PASSWORD, e.target.value)
        }
      />
      */}
      <PasswordField
        id={RegisterFormKey.CONFIRM_PASSWORD}
        value={formState.values.confirmPassword}
        onChange={(e) =>
          onChangeField(RegisterFormKey.CONFIRM_PASSWORD, e.target.value)
        }
      />

      <Button
        // outlined
        type="submit"
        loading={registerLoading}
        disabled={!valid}
        // text="Register"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
