import { Button, InputGroup, ProgressBar } from '@blueprintjs/core';
import { useState } from 'react';
import { z } from 'zod';
import { useReader } from '../../contexts/readerContext/useReader';
import { SubscriptionTag } from '../../contexts/readerContext/ReaderContext';
import ConfirmSubscriptionsForm from './ConfirmSubscriptionForm';

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
  const {
    searchSubscription,
    searchResults,
    searchSubscriptionLoading,
    addSubscriptions,
    addSubscriptionsLoading,
  } = useReader();

  const { url, valid, onChangeUrl } = useAddSubscription();

  const onSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchSubscription(url);
  };

  const onSubmitAdd = (subscriptionTags: SubscriptionTag[]) =>
    addSubscriptions(subscriptionTags);

  if (searchSubscriptionLoading || addSubscriptionsLoading)
    return <ProgressBar />;

  return (
    <>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        onSubmit={onSubmitSearch}
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
          loading={searchSubscriptionLoading}
          disabled={!valid}
        />
      </form>
      {searchResults.length > 0 && (
        <ConfirmSubscriptionsForm
          subscriptionTags={searchResults}
          onSubmitAdd={onSubmitAdd}
        />
      )}
    </>
  );
};

export default AddSubscriptionForm;
