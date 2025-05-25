import { Button, InputGroup } from '@blueprintjs/core';
import { useState } from 'react';
import { z } from 'zod';

const useSearchSubscription = () => {
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

type Props = {
  onSubmitSearch: (url: string) => Promise<void>;
  loading: boolean;
};

const SearchSubscriptionForm = ({ onSubmitSearch, loading }: Props) => {
  const { url, valid, onChangeUrl } = useSearchSubscription();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitSearch(url);
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 10,
      }}
      onSubmit={onSubmit}
    >
      <InputGroup
        placeholder="Subscribe"
        value={url}
        onValueChange={onChangeUrl}
      />
      <Button
        type="submit"
        title="Search"
        text="Search"
        loading={loading}
        disabled={!valid}
      />
    </form>
  );
};

export default SearchSubscriptionForm;
