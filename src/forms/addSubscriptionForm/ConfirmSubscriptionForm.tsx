import { Button, Checkbox } from '@blueprintjs/core';
import * as motion from 'motion/react-client';
import { useEffect, useState } from 'react';
import { SubscriptionTag } from '../../contexts/readerContext/ReaderContext';
import { AnimatePresence } from 'motion/react';

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

type Props = {
  visible: boolean;
  subscriptionTags: SubscriptionTag[];
  onSubmitAdd: (subscriptionTags: SubscriptionTag[]) => void;
  loading: boolean;
  clearSearch: () => void;
};

const ConfirmSubscriptionsForm = ({
  visible,
  subscriptionTags,
  onSubmitAdd,
  loading,
  clearSearch,
}: Props) => {
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
    <AnimatePresence>
      {visible && (
        <motion.div
          // initial={{ opacity: 0, scale: 0 }}
          // animate={{ opacity: 1, scale: 1 }}
          // exit={{ opacity: 0, scale: 0 }}

          initial={{ opacity: 0, scaleY: 0, originY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{
            duration: 0.4,
            scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
          }}
          style={{
            border: '1px solid grey',
            borderRadius: '10px',
            padding: '10px',
          }}
        >
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
                  disabled={loading}
                >
                  {ss.title}
                </Checkbox>
              ))}
            </div>
            <Button title="Cancel" text="Cancel" onClick={clearSearch} />
            <Button title="Add" text="Add" type="submit" loading={loading} />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmSubscriptionsForm;
