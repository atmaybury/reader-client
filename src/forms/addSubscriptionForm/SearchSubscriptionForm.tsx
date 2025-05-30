import { Button, Flex, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { z } from 'zod';

const useSearchSubscription = () => {
  const [url, setUrl] = useState('');
  const [valid, setValid] = useState(false);

  const validateUrl = (value: string) =>
    z.string().url().safeParse(value).success;

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValid(validateUrl(e.target.value));
    setUrl(e.target.value);
  };

  const clearUrl = () => setUrl('');

  return {
    url,
    valid,
    onChangeUrl,
    clearUrl,
  };
};

type Props = {
  onSubmitSearch: (url: string) => Promise<void>;
  loading: boolean;
};

const SearchSubscriptionForm = ({ onSubmitSearch, loading }: Props) => {
  const { url, valid, onChangeUrl, clearUrl } = useSearchSubscription();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearUrl();
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
      <Input placeholder="Subscribe" value={url} onChange={onChangeUrl} />
      <Flex direction="row">
        <Flex flex={1} />
        <Button
          type="submit"
          title="Search"
          loading={loading}
          disabled={!valid}
        >
          Search
        </Button>
      </Flex>
    </form>
  );
};

export default SearchSubscriptionForm;
