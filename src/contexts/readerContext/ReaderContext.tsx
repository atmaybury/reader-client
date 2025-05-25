import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { getUserSubscriptionsRequest } from '../../core/apiFunctions';
import { useAuthorization } from '../authorizationContext/useAuthorization';
import { z } from 'zod';

export type Subscription = {
  id: number;
  title: string;
  url: string;
};

export const subscriptionTagSchema = z.object({
  title: z.string(),
  href: z.string(),
});

export type SubscriptionTag = z.infer<typeof subscriptionTagSchema>;

type ReaderState = {
  userSubscriptions: Subscription[];
  selectedSubscriptionId?: number;
};

const defaultReaderState: ReaderState = {
  userSubscriptions: [],
  selectedSubscriptionId: undefined,
};

/* Action types */

type SetUserSubscriptionsAction = {
  type: 'SET_USER_SUBSCRIPTIONS';
  payload: Subscription[];
};

type AddUserSubscriptionsAction = {
  type: 'ADD_USER_SUBSCRIPTIONS';
  payload: Subscription[];
};

type DeleteUserSubscriptionsAction = {
  type: 'DELETE_USER_SUBSCRIPTIONS';
  payload: number[];
};

type SetSelectedSubscriptionIdAction = {
  type: 'SET_SELECTED_SUBSCRIPTION_ID';
  payload: number;
};

type ReaderReducerAction =
  | SetUserSubscriptionsAction
  | AddUserSubscriptionsAction
  | DeleteUserSubscriptionsAction
  | SetSelectedSubscriptionIdAction;

const readerReducer = (state: ReaderState, action: ReaderReducerAction) => {
  switch (action.type) {
    case 'SET_USER_SUBSCRIPTIONS':
      return { ...state, userSubscriptions: action.payload };
    case 'ADD_USER_SUBSCRIPTIONS':
      return {
        ...state,
        userSubscriptions: [...state.userSubscriptions, ...action.payload],
      };
    case 'DELETE_USER_SUBSCRIPTIONS':
      return {
        ...state,
        userSubscriptions: state.userSubscriptions.filter(
          (s) => !action.payload.includes(s.id),
        ),
      };
    case 'SET_SELECTED_SUBSCRIPTION_ID':
      return {
        ...state,
        selectedSubscriptionId: action.payload,
      };
    default:
      return state;
  }
};

const ReaderStateContext = createContext(defaultReaderState);
const ReaderDispatchContext = createContext<
  React.Dispatch<ReaderReducerAction>
>(() => {});

type Props = {
  children: React.ReactNode;
};

export const ReaderProvider = ({ children }: Props) => {
  const { token } = useAuthorization();

  const [state, dispatch] = useReducer(readerReducer, defaultReaderState);

  const { data } = useQuery({
    queryKey: ['getUserSubscriptions'],
    queryFn: () => getUserSubscriptionsRequest(),
    enabled: !!token,
  });

  useEffect(() => {
    if (data)
      dispatch({
        type: 'SET_USER_SUBSCRIPTIONS',
        payload: data,
      });
  }, [data]);

  return (
    <ReaderStateContext.Provider value={state}>
      <ReaderDispatchContext.Provider value={dispatch}>
        {children}
      </ReaderDispatchContext.Provider>
    </ReaderStateContext.Provider>
  );
};

export const useReaderStateContext = () => useContext(ReaderStateContext);
export const useReaderDispatchContext = () => useContext(ReaderDispatchContext);
