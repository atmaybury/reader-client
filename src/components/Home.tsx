import { Flex } from '@chakra-ui/react';
// import Header from './Header';
import MainPanel from './MainPanel';
import Sidebar from './Sidebar';

const Home = () => (
  <Flex direction="column" width="100vw" height="100vh">
    {/*
    <Header />
    */}
    <Flex direction="row" flex={1} width="100%" height="100%" overflow="hidden">
      <div style={{ flex: 1 }}>
        <Sidebar />
      </div>
      <div style={{ flex: 4 }}>
        <MainPanel />
      </div>
    </Flex>
  </Flex>
);

export default Home;
