import { Alignment, Button, Card, Navbar, Popover } from '@blueprintjs/core';
import { useAuthorization } from '../contexts/authorizationContext/useAuthorization';

const UserButton = () => {
  const { user } = useAuthorization();

  return (
    <Popover
      usePortal={true}
      content={
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h5>{user.username}</h5>
            <h5>{user.email}</h5>
          </div>
        </Card>
      }
      interactionKind="click"
      placement="bottom"
    >
      <Button className="bp5-minimal" icon="user" title="User" />
    </Popover>
  );
};

const Header = () => {
  const { logout } = useAuthorization();

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Reader</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button className="bp5-minimal" icon="settings" title="Settings" />
        <UserButton />
        <Navbar.Divider />
        <Button
          className="bp5-minimal"
          icon="log-out"
          onClick={logout}
          title="Log out"
          text="Log out"
        />
      </Navbar.Group>
    </Navbar>
  );
};

export default Header;
