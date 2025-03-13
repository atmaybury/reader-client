import { useEffect } from 'react';
import { AuthorizationProvider } from './contexts/authorizationContext/AuthorizationContext';
import { useAuthorization } from './contexts/authorizationContext/useAuthorization';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './components/Home';
import { ReaderProvider } from './contexts/readerContext/ReaderContext';
import LoggedOutView from './components/LoggedOutView';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthorizationProvider>
      <ReaderProvider>
        <MainApp />
      </ReaderProvider>
    </AuthorizationProvider>
  </QueryClientProvider>
);

const MainApp = () => {
  const { loggedIn, user } = useAuthorization();

  useEffect(() => {
    console.log('Logged in: ', loggedIn);
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
      {loggedIn ? <Home /> : <LoggedOutView />}
    </div>
  );
};

export default App;
