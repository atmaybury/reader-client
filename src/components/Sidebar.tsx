import { Flex, Button, Popover, Portal, Text, VStack } from '@chakra-ui/react';
import { useReader } from '../contexts/readerContext/useReader';
import AddSubscriptionForm from '../forms/addSubscriptionForm/AddSubscriptionForm';
import { useAuthorization } from '@/contexts/authorizationContext/useAuthorization';
import { useState } from 'react';
import { RiLogoutCircleRLine, RiUser3Fill } from 'react-icons/ri';

const UserButton = () => {
  const { user } = useAuthorization();

  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <Button title="User" size="sm" variant="outline">
          <RiUser3Fill />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Flex direction="column">
                <h5>{user.username}</h5>
                <h5>{user.email}</h5>
              </Flex>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

const UserSubscriptionsList = () => {
  const {
    userSubscriptions,
    selectedSubscriptionId,
    setSelectedSubscriptionId,
  } = useReader();

  const handleClick = (subscriptionId: number) => () =>
    setSelectedSubscriptionId(subscriptionId);

  return (
    <Flex direction="column" w="100%" overflowY="auto" p={2}>
      <VStack align="stretch" gap={2}>
        {userSubscriptions.map((s) => (
          <Button
            key={s.id}
            onClick={handleClick(s.id)}
            variant={s.id === selectedSubscriptionId ? 'outline' : 'ghost'}
            justifyContent="flex-start"
          >
            <Text truncate>{s.title}</Text>
          </Button>
        ))}
      </VStack>
    </Flex>
  );
};

const SideBarFooter = () => {
  const { logout } = useAuthorization();

  return (
    <Flex direction="row" gap={2} justifyContent="flex-end">
      <UserButton />
      <Button title="Logout" size="sm" variant="outline" onClick={logout}>
        <RiLogoutCircleRLine />
      </Button>
    </Flex>
  );
};

const Sidebar = () => (
  <Flex direction="column" height="100%" p={2} gap={2} overflow="hidden">
    <Text>Reader</Text>

    <AddSubscriptionForm />
    <UserSubscriptionsList />

    <Flex flex={1} />
    <SideBarFooter />
  </Flex>
);

export default Sidebar;
