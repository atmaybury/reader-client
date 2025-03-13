import { Button, InputGroup } from '@blueprintjs/core';
import { useState } from 'react';
import { z } from 'zod';
import { useReader } from '../../contexts/readerContext/useReader';

const useAddSubscription = () => {
  const [url, setUrl] = useState('');
  const [valid, setValid] = useState(false);

  const validateUrl = (value: string) =>
    z.string().url().safeParse(value).success;

  const onChangeUrl = (value: string) => {
    setValid(validateUrl(value));
    setUrl(value);
  };

  return {
    url,
    valid,
    onChangeUrl,
  };
};

const AddSubscriptionForm = () => {
  const { addSubscription, addSubscriptionLoading } = useReader();
  const { url, valid, onChangeUrl } = useAddSubscription();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSubscription(url);
  };

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      onSubmit={onSubmit}
    >
      <InputGroup
        placeholder="Subscribe"
        value={url}
        onValueChange={onChangeUrl}
      />
      <Button
        type="submit"
        title="Add"
        text="Add"
        loading={addSubscriptionLoading}
        disabled={!valid}
      />
    </form>
  );
};

export default AddSubscriptionForm;
