import { Divider, Menu, MenuItem } from '@blueprintjs/core';
import { useReader } from '../contexts/readerContext/useReader';
import AddSubscriptionForm from '../forms/addSubscriptionForm/AddSubscriptionForm';

const Sidebar = () => {
  const { userSubscriptions, setSelectedSubscriptionId } = useReader();

  const handleClick = (subscriptionId: number) =>
    setSelectedSubscriptionId(subscriptionId);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        gap: 10,
      }}
    >
      <AddSubscriptionForm />
      <Divider />
      <Menu>
        {userSubscriptions.map((s) => (
          <MenuItem
            key={s.id}
            text={s.title}
            onClick={() => handleClick(s.id)}
          />
        ))}
      </Menu>
    </div>
  );
};
export default Sidebar;
