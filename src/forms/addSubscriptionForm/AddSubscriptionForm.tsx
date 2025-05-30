import { useReader } from '../../contexts/readerContext/useReader';
import { SubscriptionTag } from '../../contexts/readerContext/ReaderContext';
import ConfirmSubscriptionsForm from './ConfirmSubscriptionForm';
import SearchSubscriptionForm from './SearchSubscriptionForm';

const AddSubscriptionForm = () => {
  const {
    searchSubscription,
    searchResults,
    searchSubscriptionLoading,
    addSubscriptions,
    addSubscriptionsLoading,
    clearSearch,
  } = useReader();
  const onSubmitSearch = async (url: string) => searchSubscription(url);

  const onSubmitAdd = (subscriptionTags: SubscriptionTag[]) => {
    clearSearch();
    addSubscriptions(subscriptionTags);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <SearchSubscriptionForm
        onSubmitSearch={onSubmitSearch}
        loading={searchSubscriptionLoading}
      />
      <ConfirmSubscriptionsForm
        visible={searchResults.length > 0}
        subscriptionTags={searchResults}
        onSubmitAdd={onSubmitAdd}
        loading={addSubscriptionsLoading}
        clearSearch={clearSearch}
      />
    </div>
  );
};

export default AddSubscriptionForm;
