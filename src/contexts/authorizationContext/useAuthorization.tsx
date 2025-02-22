import { useEffect } from 'react';
import {
  useAuthorizationDispatchContext,
  useAuthorizationStateContext,
} from './AuthorizationContext';

/**
 * Hook for interacting with the AuthorizationContext
 */

export const useAuthorization = () => {
  const state = useAuthorizationStateContext();
  const dispatch = useAuthorizationDispatchContext();

  /* MUTATIONS */

  const login = (value: string) => {
    window.localStorage.setItem('token', value);
    dispatch({ type: 'LOGIN', payload: value });
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    console.log('??? ', state.loggedIn);
  }, [state.loggedIn]);

  return {
    tokenString: state.token,
    loggedIn: state.loggedIn,
    login,
    logout,
  };
};
