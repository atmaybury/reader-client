import React, { createContext, useContext, useReducer } from 'react';
import { decodeToken } from '../../core/helpers';
import { z } from 'zod';

export const UserTokenSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  exp: z.number(),
});

type UserToken = z.infer<typeof UserTokenSchema>;

const defaultUserToken: UserToken = {
  id: 'none',
  username: 'none',
  email: 'none',
  exp: 0,
};

type AuthorizationState = {
  token: string;
  user: UserToken;
  loggedIn: boolean;
};

const defaultAuthorizationState: AuthorizationState = {
  token: '',
  user: defaultUserToken,
  loggedIn: false,
};

/* Action types */

type LoginAction = {
  type: 'LOGIN';
  payload: {
    token: string;
    user: UserToken;
  };
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
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loggedIn: true,
      };
    case 'LOGOUT':
      return { ...state, token: '', user: defaultUserToken, loggedIn: false };
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
      const userToken = decodeToken(token);
      if (userToken)
        dispatch({ type: 'LOGIN', payload: { token, user: userToken } });
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
