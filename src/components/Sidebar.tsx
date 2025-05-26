import * as motion from 'motion/react-client';
import { Flex, Menu, MenuItem } from '@chakra-ui/react';
import { useReader } from '../contexts/readerContext/useReader';
import AddSubscriptionForm from '../forms/addSubscriptionForm/AddSubscriptionForm';

const Sidebar = () => {
  const { userSubscriptions, setSelectedSubscriptionId } = useReader();

  const handleClick = (subscriptionId: number) =>
    setSelectedSubscriptionId(subscriptionId);

  return (
    <Flex
      direction="column"
      px={2}
      pb={2}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <motion.div layout>
        <AddSubscriptionForm />
      </motion.div>
      <motion.div layout>
        <Menu.Root>
          {userSubscriptions.map((s) => (
            <MenuItem
              key={s.id}
              value={s.id.toString()}
              onClick={() => handleClick(s.id)}
            >
              {s.title}
            </MenuItem>
          ))}
        </Menu.Root>
      </motion.div>
    </Flex>
  );
};
export default Sidebar;
