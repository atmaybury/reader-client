import * as motion from 'motion/react-client';
import { useEffect, useState } from 'react';
import { SubscriptionTag } from '../../contexts/readerContext/ReaderContext';
import { AnimatePresence } from 'motion/react';
import { Button, Checkbox, Flex } from '@chakra-ui/react';

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

  const onChange = (href: string) => (e: Checkbox.CheckedChangeDetails) => {
    setSelectableSubscriptions((prev) =>
      prev.map((ss) =>
        ss.href === href ? { ...ss, selected: e.checked === true } : ss,
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
                <Checkbox.Root
                  key={ss.href}
                  checked={ss.selected}
                  onCheckedChange={onChange(ss.href)}
                  disabled={loading}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>{ss.title}</Checkbox.Label>
                </Checkbox.Root>
              ))}
            </div>
            <Flex direction="row" justifyContent="flex-end" gap={2}>
              <Button title="Cancel" onClick={clearSearch}>
                Cancel
              </Button>
              <Button title="Add" type="submit" loading={loading}>
                Add
              </Button>
            </Flex>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmSubscriptionsForm;
