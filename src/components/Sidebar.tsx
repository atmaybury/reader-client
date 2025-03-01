import { useQuery } from '@tanstack/react-query';
import { useAuthorization } from '../contexts/authorizationContext/useAuthorization';
import { getUserSubscriptionsQuery } from '../core/apiFunctions';
import { Menu, MenuItem } from '@blueprintjs/core';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const { token } = useAuthorization();

  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    console.log(selectedSubscriptionId);
  }, [selectedSubscriptionId]);

  const { data, isPending, error } = useQuery({
    queryKey: ['getUserSubscriptions'],
    queryFn: () => getUserSubscriptionsQuery(token),
    enabled: !!token,
  });

  const handleClick = (subscriptionId: string) =>
    setSelectedSubscriptionId(subscriptionId);

  if (isPending) return <h4>Loading</h4>;

  if (error) return <h4>Error</h4>;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        minWidth: 0,
      }}
    >
      <Menu>
        {data.map((s) => (
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
