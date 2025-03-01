import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { useAuthorization } from '../contexts/authorizationContext/useAuthorization';

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
