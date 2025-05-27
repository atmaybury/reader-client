import * as motion from 'motion/react-client';
import { useReader } from '../contexts/readerContext/useReader';
import { Subscription } from '../contexts/readerContext/ReaderContext';
import { ReactNode, useEffect } from 'react';
import { Box, Button, Collapsible, Flex, Spinner } from '@chakra-ui/react';
import { AnimatePresence } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import { fetchFeedRequest } from '@/core/apiFunctions';
import parse from 'html-react-parser';

type FeedItem = {
  title: string;
  content: string;
  description: string;
};

type Feed = {
  title: string;
  description: string;
  items: FeedItem[];
};

const FeedItemPanel = ({ feedItem }: { feedItem: FeedItem }) => (
  <motion.div
    initial={{ opacity: 0, scaleY: 0, originY: 0 }}
    animate={{ opacity: 1, scaleY: 1 }}
    transition={{
      duration: 0.4,
      scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
    }}
  >
    <Flex direction="column" backgroundColor="bg" p={2}>
      <Collapsible.Root>
        <Collapsible.Trigger>
          <h1>{feedItem.title}</h1>
        </Collapsible.Trigger>
        <Collapsible.Content>{parse(feedItem.content)}</Collapsible.Content>
      </Collapsible.Root>
    </Flex>
  </motion.div>
);

const useSubscriptionPanel = (subscription: Subscription) => {
  const { data, isPending, error } = useQuery<Feed>({
    queryKey: [`fetchFeed_${subscription.id}`],
    queryFn: () => fetchFeedRequest(subscription.url),
  });

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return {
    feed: data,
    loading: isPending,
  };
};

type SubscriptionPanelProps = {
  selectedSubscription: Subscription;
  onDeleteSubscription: () => Promise<void>;
};

const SubscriptionPanel = ({
  selectedSubscription,
  onDeleteSubscription,
}: SubscriptionPanelProps) => {
  const { feed, loading } = useSubscriptionPanel(selectedSubscription);

  if (loading)
    return (
      <Flex
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Flex>
    );

  if (!feed) return null;

  return (
    <Flex
      direction="column"
      gap={2}
      maxWidth="800px"
      m="auto"
      overflow="hidden"
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        p={2}
        backgroundColor="bg"
      >
        <Flex direction={'column'}>
          <h1>{feed.title}</h1>
          <h3>{feed.description}</h3>
        </Flex>
        <Button onClick={onDeleteSubscription}>Unsubscribe</Button>
      </Flex>
      {feed.items.map((item, i) => (
        <FeedItemPanel key={`item_${i}`} feedItem={item} />
      ))}
    </Flex>
  );
};

const HalftonePanel = ({ children }: { children: ReactNode }) => (
  <Box
    height="100%"
    overflowY="auto"
    style={{
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
            style={{ height: '100%' }}
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
