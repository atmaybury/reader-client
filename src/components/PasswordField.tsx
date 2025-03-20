import {
  Button,
  InputGroup,
  InputGroupProps,
  Intent,
  Tooltip,
} from '@blueprintjs/core';
import { useCallback, useState } from 'react';

const PasswordField: React.FC<InputGroupProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLockClick = useCallback(
    () => setShowPassword((value) => !value),
    [],
  );

  return (
    <InputGroup
      {...props}
      rightElement={
        <Tooltip
          content={`${showPassword ? 'Hide' : 'Show'} Password`}
          disabled={props.disabled}
        >
          <Button
            disabled={props.disabled}
            icon={showPassword ? 'eye-off' : 'eye-open'}
            intent={Intent.PRIMARY}
            onClick={handleLockClick}
            minimal
          />
        </Tooltip>
      }
      type={showPassword ? 'text' : 'password'}
    />
  );
};

export default PasswordField;
