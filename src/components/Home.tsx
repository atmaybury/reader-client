import Header from './Header';
import Sidebar from './Sidebar';

export type Subscription = {
  id: string;
  title: string;
  url: string;
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
    <Header />
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flex: 1,
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
