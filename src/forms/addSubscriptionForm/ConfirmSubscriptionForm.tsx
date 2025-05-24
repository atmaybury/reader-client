import { Button, Checkbox } from '@blueprintjs/core';
import { useEffect, useState } from 'react';
import { SubscriptionTag } from '../../contexts/readerContext/ReaderContext';

const useConfirmSubscriptions = (subscriptionTags: SubscriptionTag[]) => {
  const [selectableSubscriptions, setSelectableSubscriptions] = useState<
    (SubscriptionTag & { selected: boolean })[]
  >([]);

  // keep track of which subscriptions are selected in state
  useEffect(() => {
    setSelectableSubscriptions(
      subscriptionTags.map((st) => ({ ...st, selected: false })),
    );
  }, [subscriptionTags]);

  const onChange =
    (href: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectableSubscriptions((prev) =>
        prev.map((ss) =>
          ss.href === href ? { ...ss, selected: e.target.checked } : ss,
        ),
      );
    };

  return {
    selectableSubscriptions,
    onChange,
  };
};

type ConfirmSubscriptionFormProps = {
  subscriptionTags: SubscriptionTag[];
  onSubmitAdd: (subscriptionTags: SubscriptionTag[]) => void;
};

const ConfirmSubscriptionsForm = ({
  subscriptionTags,
  onSubmitAdd,

  // addSubscriptionsLoading,
}: ConfirmSubscriptionFormProps) => {
  const { selectableSubscriptions, onChange } =
    useConfirmSubscriptions(subscriptionTags);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitAdd(
      selectableSubscriptions
        .filter((ss) => ss.selected)
        .map((ss) => ({ title: ss.title, href: ss.href })),
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div
        style={{
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {selectableSubscriptions.map((ss) => (
          <Checkbox
            key={ss.href}
            checked={ss.selected}
            onChange={onChange(ss.href)}
          >
            {ss.title}
          </Checkbox>
        ))}
      </div>
      <Button type="submit">Add</Button>
    </form>
  );
};

export default ConfirmSubscriptionsForm;
