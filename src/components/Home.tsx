import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { useAuthorization } from '../contexts/authorizationContext/useAuthorization';
import { useQuery } from '@tanstack/react-query';
import config from '../config';

type Subscription = {
  id: string;
  title: string;
  url: string;
};

const Navigation = () => {
  const { logout } = useAuthorization();
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Reader</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button className="bp5-minimal" icon="settings" title="Settings" />
        <Navbar.Divider />
        <Button
          className="bp5-minimal"
          icon="log-out"
          onClick={logout}
          title="Log out"
          text="Log out"
        />
      </Navbar.Group>
    </Navbar>
  );
};

const Sidebar = () => {
  const { token } = useAuthorization();

  const { data, isPending, error } = useQuery({
    queryKey: ['getUserSubscriptions'],
    queryFn: async () =>
      fetch(`${config.API_PATH}/user-subscriptions`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(async (res) =>
        res.text().then((body) => {
          if (!res.ok) throw new Error(body || 'Unknown error');
          return JSON.parse(body) as Subscription[];
        }),
      ),
  });

  if (isPending) return <h4>Loading</h4>;

  if (error) return <h4>Error</h4>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {data.map((s) => (
        <h6>{s.title}</h6>
      ))}
    </div>
  );
};

const Home = () => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Navigation />
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        <Sidebar />
      </div>
      <div
        style={{
          flex: 3,
          backgroundColor: 'tan',
        }}
      ></div>
    </div>
  </div>
);

export default Home;
