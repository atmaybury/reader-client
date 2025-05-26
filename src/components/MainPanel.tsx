import * as motion from 'motion/react-client';
import { useReader } from '../contexts/readerContext/useReader';
import { Subscription } from '../contexts/readerContext/ReaderContext';
import { ReactNode } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { AnimatePresence } from 'motion/react';

type SubscriptionPanelProps = {
  selectedSubscription: Subscription;
  onDeleteSubscription: () => Promise<void>;
};

const SubscriptionPanel = ({
  selectedSubscription,
  onDeleteSubscription,
}: SubscriptionPanelProps) => (
  <Box
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    <h1>{selectedSubscription.title}</h1>
    <Button onClick={onDeleteSubscription}>Delete</Button>
  </Box>
);

const HalftonePanel = ({ children }: { children: ReactNode }) => (
  <Box height="100%" paddingRight={2} paddingBottom={2}>
    <Box
      style={{
        height: '100%',
        padding: 10,
        backgroundImage: `radial-gradient(
            circle at center,
            grey 0.05rem,
            transparent 0
          )`,
        backgroundSize: '0.3rem 0.3rem',
        backgroundRepeat: 'round',
      }}
    >
      {children}
    </Box>
  </Box>
);

const MainPanel = () => {
  const { selectedSubscription, deleteSubscriptions } = useReader();

  const onDeleteSubscription = () =>
    deleteSubscriptions(
      selectedSubscription?.id ? [selectedSubscription.id] : [],
    );

  return (
    <HalftonePanel>
      <AnimatePresence>
        {selectedSubscription && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0, originY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }}
          >
            <SubscriptionPanel
              selectedSubscription={selectedSubscription}
              onDeleteSubscription={onDeleteSubscription}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </HalftonePanel>
  );
};

export default MainPanel;
