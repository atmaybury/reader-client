import { useMutation } from '@tanstack/react-query';
import {
  SubscriptionTag,
  subscriptionTagSchema,
  useReaderDispatchContext,
  useReaderStateContext,
} from './ReaderContext';
import {
  addSubscriptionsRequest,
  searchSubscriptionRequest,
} from '../../core/apiFunctions';
import { z } from 'zod';
import { useState } from 'react';

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

  const [searchResults, setSearchResults] = useState<SubscriptionTag[]>([]);

  const searchSubscriptionMutation = useMutation({
    mutationKey: ['searchSubscription'],
    mutationFn: searchSubscriptionRequest,
  });

  const searchSubscription = async (url: string) => {
    try {
      const res = await searchSubscriptionMutation.mutateAsync(url);
      z.array(subscriptionTagSchema).parse(res);
      setSearchResults(res);
    } catch (e) {
      console.error(
        'Error adding subscription: ',
        e instanceof Error ? e?.message : e,
      );
    }
  };

  const addSubscriptionsMutation = useMutation({
    mutationKey: ['addSubscriptions'],
    mutationFn: addSubscriptionsRequest,
  });

  const addSubscriptions = async (subscriptionTags: SubscriptionTag[]) => {
    try {
      const addedSubscriptions =
        await addSubscriptionsMutation.mutateAsync(subscriptionTags);
      for (const subscription of addedSubscriptions) {
        console.log('NEW SUBSCRIPTION: ', subscription);
        // dispatch({
        //   type: 'ADD_USER_SUBSCRIPTION',
        //   payload: subscription,
        // });
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
    searchSubscription,
    searchSubscriptionLoading: searchSubscriptionMutation.isPending,
    searchResults,
    addSubscriptions,
    addSubscriptionsLoading: addSubscriptionsMutation.isPending,
    selectedSubscriptionId: state.selectedSubscriptionId,
    setSelectedSubscriptionId,
  };
};
