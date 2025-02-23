import React, { createContext, useContext, useReducer } from 'react';
import { decodeToken } from '../../core/helpers';

type UserToken = {
  username: string;
  email: string;
};

type AuthorizationState = {
  user?: UserToken;
};

const defaultAuthorizationState: AuthorizationState = {
  user: undefined,
};

/* Action types */

type LoginAction = {
  type: 'LOGIN';
  payload: UserToken;
};

type LogoutAction = {
  type: 'LOGOUT';
};

type AuthorizationReducerAction = LoginAction | LogoutAction;

const authorizationReducer = (
  state: AuthorizationState,
  action: AuthorizationReducerAction,
) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: undefined };
    default:
      return state;
  }
};

const AuthorizationStateContext = createContext(defaultAuthorizationState);
const AuthorizationDispatchContext = createContext<
  React.Dispatch<AuthorizationReducerAction>
>(() => {});

type Props = {
  children: React.ReactNode;
};

export const AuthorizationProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(
    authorizationReducer,
    defaultAuthorizationState,
  );

  if (!state.user) {
    const token = window.localStorage.getItem('token');
    if (token) {
      const userToken = decodeToken(token);
      if (userToken) dispatch({ type: 'LOGIN', payload: userToken });
    }
  }

  return (
    <AuthorizationStateContext.Provider value={state}>
      <AuthorizationDispatchContext.Provider value={dispatch}>
        {children}
      </AuthorizationDispatchContext.Provider>
    </AuthorizationStateContext.Provider>
  );
};

export const useAuthorizationStateContext = () =>
  useContext(AuthorizationStateContext);
export const useAuthorizationDispatchContext = () =>
  useContext(AuthorizationDispatchContext);
