import { useEffect, useState } from 'react';
import { AuthorizationProvider } from './contexts/authorizationContext/AuthorizationContext';
import { Button } from '@blueprintjs/core';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './forms/loginForm/LoginForm';
import RegisterForm from './forms/registerForm/RegisterForm';
import Home from './components/Home';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthorizationProvider>
      <MainApp />
    </AuthorizationProvider>
  </QueryClientProvider>
);

const MainApp = () => {
  const { loggedIn, user } = useAuthorization();

  console.log('LOGGED IN: ', loggedIn);

  useEffect(() => {
    console.log('User: ', user);
  }, [user]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
      }}
    >
      {loggedIn ? <Home /> : <LoggedOutScreen />}
    </div>
  );
};

type FormType = 'login' | 'register';

const LoggedOutScreen = () => {
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
            minimal
            onClick={() => onChangeForm('login')}
            disabled={form === 'login'}
            style={{ flex: 1 }}
            text="Login"
          />
          <Button
            minimal
            onClick={() => onChangeForm('register')}
            disabled={form === 'register'}
            style={{ flex: 1 }}
            text="Register"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
