import { Divider, Menu, MenuItem } from '@blueprintjs/core';
import { useReader } from '../contexts/readerContext/useReader';
import AddSubscriptionForm from '../forms/addSubscriptionForm/AddSubscriptionForm';
import { useEffect } from 'react';

const Sidebar = () => {
  const { userSubscriptions, setSelectedSubscriptionId } = useReader();

  const handleClick = (subscriptionId: string) =>
    setSelectedSubscriptionId(subscriptionId);

  useEffect(() => {
    console.log(userSubscriptions);
  }, [userSubscriptions]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        width: '200px',
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
