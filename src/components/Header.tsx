import { useAuthorization } from '@/contexts/authorizationContext/useAuthorization';
import { Button, Flex, Popover, Portal, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { RiLogoutCircleRLine, RiUser3Fill } from 'react-icons/ri';

const UserButton = () => {
  const { user } = useAuthorization();

  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
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

const Header = () => {
  const { logout } = useAuthorization();

  return (
    <Flex
      height={16}
      padding={2}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text>Reader</Text>
      <Flex style={{ flexDirection: 'row', gap: 2 }}>
        <UserButton />
        <Button size="sm" variant="outline" onClick={logout}>
          <RiLogoutCircleRLine />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
