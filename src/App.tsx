import { useState } from 'react';
import './App.css';
import { AuthorizationProvider } from './contexts/authorizationContext/AuthorizationContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@blueprintjs/core';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';

const App = () => (
  <AuthorizationProvider>
    <MainApp />
  </AuthorizationProvider>
);

const MainApp = () => {
  const { loggedIn, logout } = useAuthorization();

  return (
    <>{loggedIn ? <Button onClick={logout}>LOGOUT</Button> : <LoginScreen />}</>
  );
};

type FormType = 'login' | 'register';

const LoginScreen = () => {
  const [form, setForm] = useState<FormType>('login');

  const onChangeForm = (form: FormType) => setForm(form);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {form === 'login' ? <LoginForm /> : <RegisterForm />}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <Button
          onClick={() => onChangeForm('login')}
          disabled={form === 'login'}
          style={{ flex: 1 }}
        >
          Login
        </Button>
        <Button
          onClick={() => onChangeForm('register')}
          disabled={form === 'register'}
          style={{ flex: 1 }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default App;
