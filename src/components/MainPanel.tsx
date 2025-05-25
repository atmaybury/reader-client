import { Button, Card } from '@blueprintjs/core';
import { useReader } from '../contexts/readerContext/useReader';
import { Subscription } from '../contexts/readerContext/ReaderContext';
import { ReactNode } from 'react';

type SubscriptionPanelProps = {
  selectedSubscription: Subscription;
  onDeleteSubscription: () => Promise<void>;
};

const SubscriptionPanel = ({
  selectedSubscription,
  onDeleteSubscription,
}: SubscriptionPanelProps) => (
  <Card
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    <h1>{selectedSubscription.title}</h1>
    <Button onClick={onDeleteSubscription}>Delete</Button>
  </Card>
);

const HalftonePanel = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      height: '100%',
      paddingRight: 10,
      paddingBottom: 10,
    }}
  >
    <div
      style={{
        height: '100%',
        padding: 10,
        backgroundImage: `radial-gradient(
            circle at center,
            black 0.05rem,
            transparent 0
          )`,
        backgroundSize: '0.3rem 0.3rem',
        backgroundRepeat: 'round',
      }}
    >
      {children}
    </div>
  </div>
);

const MainPanel = () => {
  const { selectedSubscription, deleteSubscriptions } = useReader();

  const onDeleteSubscription = () =>
    deleteSubscriptions(
      selectedSubscription?.id ? [selectedSubscription.id] : [],
    );

  return (
    <HalftonePanel>
      {selectedSubscription && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <SubscriptionPanel
            selectedSubscription={selectedSubscription}
            onDeleteSubscription={onDeleteSubscription}
          />
        </div>
      )}
    </HalftonePanel>
  );
};

export default MainPanel;
