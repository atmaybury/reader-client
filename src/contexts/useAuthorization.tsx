import { useAuthorizationDispatchContext, useAuthorizationStateContext } from './AuthorizationContext';

/**
 * Hook for interacting with the AuthorizationContext
 */

export const useAuthorization = () => {
  const state = useAuthorizationStateContext();
  const dispatch = useAuthorizationDispatchContext();

  /* MUTATIONS */

  // toggle whether to render live data from websocket
  const login = (value: string) =>
    dispatch({ type: 'LOGIN', payload: value });

  return {
    tokenString: state.token,
    login
  };
};
