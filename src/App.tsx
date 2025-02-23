import { ReactNode, useEffect, useState } from 'react';
import { AuthorizationProvider } from './contexts/authorizationContext/AuthorizationContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@blueprintjs/core';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
    <ScreenWrapper>
      <Button outlined onClick={logout}>
        LOGOUT
      </Button>
    </ScreenWrapper>
  );
};

type FormType = 'login' | 'register';

const LoggedOutScreen = () => {
  const [form, setForm] = useState<FormType>('login');

  const onChangeForm = (form: FormType) => setForm(form);

  return (
    <ScreenWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {form === 'login' ? <LoginForm /> : <RegisterForm />}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <Button
            minimal
            onClick={() => onChangeForm('login')}
            disabled={form === 'login'}
            style={{ flex: 1 }}
          >
            Login
          </Button>
          <Button
            minimal
            onClick={() => onChangeForm('register')}
            disabled={form === 'register'}
            style={{ flex: 1 }}
          >
            Register
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

const ScreenWrapper = ({ children }: { children: ReactNode }) => (
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
    {children}
  </div>
);

export default App;
