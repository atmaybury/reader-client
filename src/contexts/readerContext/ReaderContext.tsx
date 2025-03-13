import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { getUserSubscriptionsRequest } from '../../core/apiFunctions';
import { useAuthorization } from '../authorizationContext/useAuthorization';

export type Subscription = {
  id: string;
  title: string;
  url: string;
};

type ReaderState = {
  userSubscriptions: Subscription[];
  selectedSubscriptionId?: string;
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

type AddUserSubscriptionAction = {
  type: 'ADD_USER_SUBSCRIPTION';
  payload: Subscription;
};

type SetSelectedSubscriptionIdAction = {
  type: 'SET_SELECTED_SUBSCRIPTION_ID';
  payload: string;
};

type ReaderReducerAction =
  | SetUserSubscriptionsAction
  | AddUserSubscriptionAction
  | SetSelectedSubscriptionIdAction;

const readerReducer = (state: ReaderState, action: ReaderReducerAction) => {
  switch (action.type) {
    case 'SET_USER_SUBSCRIPTIONS':
      return { ...state, userSubscriptions: action.payload };
    case 'ADD_USER_SUBSCRIPTION':
      return {
        ...state,
        userSubscriptions: [...state.userSubscriptions, action.payload],
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
