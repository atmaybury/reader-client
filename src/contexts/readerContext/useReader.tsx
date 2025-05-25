import { useMutation } from '@tanstack/react-query';
import {
  SubscriptionTag,
  subscriptionTagSchema,
  useReaderDispatchContext,
  useReaderStateContext,
} from './ReaderContext';
import {
  addSubscriptionsRequest,
  deleteSubscriptionsRequest,
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

  const clearSearch = () => setSearchResults([]);

  const addSubscriptionsMutation = useMutation({
    mutationKey: ['addSubscriptions'],
    mutationFn: addSubscriptionsRequest,
  });

  const addSubscriptions = async (subscriptionTags: SubscriptionTag[]) => {
    try {
      const addedSubscriptions =
        await addSubscriptionsMutation.mutateAsync(subscriptionTags);
      dispatch({
        type: 'ADD_USER_SUBSCRIPTIONS',
        payload: addedSubscriptions,
      });
    } catch (e) {
      console.error(
        'Error adding subscriptions: ',
        e instanceof Error ? e?.message : e,
      );
    }
  };

  const deleteSubscriptionsMutation = useMutation({
    mutationKey: ['deleteSubscriptions'],
    mutationFn: deleteSubscriptionsRequest,
  });

  const deleteSubscriptions = async (ids: number[]) => {
    try {
      const deletedSubscriptionIds =
        await deleteSubscriptionsMutation.mutateAsync(ids);
      dispatch({
        type: 'DELETE_USER_SUBSCRIPTIONS',
        payload: deletedSubscriptionIds,
      });
    } catch (e) {
      console.error(
        'Error deleting subscription: ',
        e instanceof Error ? e?.message : e,
      );
    }
  };

  const setSelectedSubscriptionId = (id: number) =>
    dispatch({
      type: 'SET_SELECTED_SUBSCRIPTION_ID',
      payload: id,
    });

  return {
    userSubscriptions: state.userSubscriptions,
    searchSubscription,
    searchSubscriptionLoading: searchSubscriptionMutation.isPending,
    searchResults,
    clearSearch,
    addSubscriptions,
    addSubscriptionsLoading: addSubscriptionsMutation.isPending,
    deleteSubscriptions,
    deleteSubscriptionsLoading: deleteSubscriptionsMutation.isPending,
    selectedSubscriptionId: state.selectedSubscriptionId,
    setSelectedSubscriptionId,
    selectedSubscription: state.userSubscriptions.find(
      (s) => s.id === state.selectedSubscriptionId,
    ),
  };
};
