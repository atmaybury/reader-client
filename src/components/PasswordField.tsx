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
      endElement={
        <Button disabled={props.disabled} onClick={handleLockClick}>
          {showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
        </Button>
      }
    >
      <Input {...props} />
    </InputGroup>
  );
};

export default PasswordField;
