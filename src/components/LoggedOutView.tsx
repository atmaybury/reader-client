import { useState } from 'react';
import LoginForm from '../forms/loginForm/LoginForm';
import RegisterForm from '../forms/registerForm/RegisterForm';
import { Button } from '@chakra-ui/react';

type FormType = 'login' | 'register';

const LoggedOutView = () => {
  const [form, setForm] = useState<FormType>('login');

  const onChangeForm = (form: FormType) => setForm(form);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {form === 'login' ? <LoginForm /> : <RegisterForm />}

        <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <Button
            onClick={() => onChangeForm('login')}
            disabled={form === 'login'}
            style={{ flex: 1 }}
            // text="Login"
          />
          <Button
            // minimal
            onClick={() => onChangeForm('register')}
            disabled={form === 'register'}
            style={{ flex: 1 }}
            // text="Register"
          />
        </div>
      </div>
    </div>
  );
};

export default LoggedOutView;
