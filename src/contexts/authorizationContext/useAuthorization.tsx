import { useMutation } from '@tanstack/react-query';
import {
  useAuthorizationDispatchContext,
  useAuthorizationStateContext,
} from './AuthorizationContext';
import config from '../../config';
import { decodeToken } from '../../core/helpers';

type UserInput = {
  username: string;
  email: string;
  password: string;
};

/**
 * Hook for interacting with the AuthorizationContext
 */
export const useAuthorization = () => {
  const state = useAuthorizationStateContext();
  const dispatch = useAuthorizationDispatchContext();

  /* MUTATIONS */

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: async (user: UserInput) =>
      fetch(`${config.API_PATH}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
      }).then(async (res) =>
        res.text().then((body) => {
          if (!res.ok) throw new Error(body || 'Unknown error');
          return body;
        }),
      ),
  });

  const register = async (user: UserInput) => {
    try {
      const res = await registerMutation.mutateAsync(user);
      window.localStorage.setItem('token', res);
      const userToken = decodeToken(res);
      if (userToken) dispatch({ type: 'LOGIN', payload: userToken });
    } catch (e) {
      if (e instanceof Error)
        console.error('Error registering user: ', e?.message);
      else console.error('Error registering user: ', e);
    }
  };

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (user: UserInput) =>
      fetch(`${config.API_PATH}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
      }).then(async (res) =>
        res.text().then((body) => {
          if (!res.ok) throw new Error(body || 'Unknown error');
          return body;
        }),
      ),
  });

  const login = async (user: UserInput) => {
    try {
      const res = await loginMutation.mutateAsync(user);
      window.localStorage.setItem('token', res);
      const userToken = decodeToken(res);
      if (userToken) dispatch({ type: 'LOGIN', payload: userToken });
    } catch (e) {
      if (e instanceof Error) console.error('Error logging in: ', e?.message);
      else console.error('Error logging in: ', e);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return {
    user: state.user,
    loggedIn: !!state.user,
    login,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    register,
    registerLoading: registerMutation.isPending,
    registerError: registerMutation.error,
    logout,
  };
};
