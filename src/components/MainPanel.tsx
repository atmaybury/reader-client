import { useReader } from '../contexts/readerContext/useReader';

const MainPanel = () => {
  const { selectedSubscriptionId } = useReader();
  return <h1>{`Selected subscription: ${selectedSubscriptionId}`}</h1>;
};

export default MainPanel;
