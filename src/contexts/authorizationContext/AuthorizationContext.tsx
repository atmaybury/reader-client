import React, { createContext, useContext, useEffect, useReducer } from 'react';

type AuthorizationState = {
  token?: string;
  loggedIn: boolean;
};

const defaultAuthorizationState: AuthorizationState = {
  token: undefined,
  loggedIn: false,
};

/* Action types */

type LoginAction = {
  type: 'LOGIN';
  payload: string;
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
      return { ...state, token: action.payload, loggedIn: true };
    case 'LOGOUT':
      return { ...state, token: undefined, loggedIn: false };
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

  if (!state.loggedIn) {
    const token = window.localStorage.getItem('token');
    if (token) {
      dispatch({ type: 'LOGIN', payload: token });
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
