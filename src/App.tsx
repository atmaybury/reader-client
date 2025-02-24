import { useEffect, useState } from 'react';
import { AuthorizationProvider } from './contexts/authorizationContext/AuthorizationContext';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './forms/loginForm/LoginForm';
import RegisterForm from './forms/registerForm/RegisterForm';

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
      {loggedIn ? <LoggedInScreen /> : <LoggedOutScreen />}
    </div>
  );
};

const LoggedInScreen = () => {
  const { logout } = useAuthorization();
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Reader</Navbar.Heading>
          <Navbar.Divider />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Divider />
          <Button
            className="bp5-minimal"
            icon="log-out"
            onClick={logout}
            text="Log out"
          />
        </Navbar.Group>
      </Navbar>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      ></div>
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
        backgroundColor: 'tan',
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
