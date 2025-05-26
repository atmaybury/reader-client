// import {
//   Button,
//   // InputGroup,
//   // InputGroupProps,
//   Intent,
//   // Tooltip,
// } from '@blueprintjs/core';
import { Button, Input, InputGroup, InputProps } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

const PasswordField: React.FC<InputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLockClick = useCallback(
    () => setShowPassword((value) => !value),
    [],
  );

  return (
    <InputGroup
      // {...props}
      endElement={
        <Button
          disabled={props.disabled}
          // icon={showPassword ? 'eye-off' : 'eye-open'}
          // intent={Intent.PRIMARY}
          onClick={handleLockClick}
          // minimal
        >
          {showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
        </Button>
      }
      // type={showPassword ? 'text' : 'password'}
    >
      <Input {...props} />
    </InputGroup>
  );
};

export default PasswordField;
