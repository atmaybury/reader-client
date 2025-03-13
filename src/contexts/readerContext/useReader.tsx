import { useMutation } from '@tanstack/react-query';
import {
  useReaderDispatchContext,
  useReaderStateContext,
} from './ReaderContext';
import { addSubscriptionRequest } from '../../core/apiFunctions';

export type UserInput = {
  username: string;
  email: string;
  password: string;
};

/**
 * Hook for interacting with the AuthorizationContext
 */
export const useReader = () => {
  const state = useReaderStateContext();
  const dispatch = useReaderDispatchContext();

  const addSubscriptionMutation = useMutation({
    mutationKey: ['addSubscription'],
    mutationFn: addSubscriptionRequest,
  });

  const addSubscription = async (url: string) => {
    try {
      const addedSubscriptions = await addSubscriptionMutation.mutateAsync(url);
      for (const subscription of addedSubscriptions) {
        dispatch({
          type: 'ADD_USER_SUBSCRIPTION',
          payload: subscription,
        });
      }
    } catch (e) {
      console.error(
        'Error adding subscription: ',
        e instanceof Error ? e?.message : e,
      );
    }
  };

  const setSelectedSubscriptionId = (id: string) =>
    dispatch({
      type: 'SET_SELECTED_SUBSCRIPTION_ID',
      payload: id,
    });

  return {
    userSubscriptions: state.userSubscriptions,
    addSubscription,
    addSubscriptionLoading: addSubscriptionMutation.isPending,
    selectedSubscriptionId: state.selectedSubscriptionId,
    setSelectedSubscriptionId,
  };
};
