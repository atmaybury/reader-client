import { Flex } from '@chakra-ui/react';
import MainPanel from './MainPanel';
import Sidebar from './Sidebar';

const Home = () => (
  <Flex direction="column" width="100vw" height="100vh" overflow="hidden">
    <Flex direction="row" flex={1} width="100%" height="100%" overflow="hidden">
      <Flex flex={1} overflow="auto">
        <Sidebar />
      </Flex>
      <Flex flex={3} overflow="auto">
        <MainPanel />
      </Flex>
    </Flex>
  </Flex>
);

export default Home;
