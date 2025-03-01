import { useMutation } from '@tanstack/react-query';
import {
  useAuthorizationDispatchContext,
  useAuthorizationStateContext,
} from './AuthorizationContext';
import { decodeToken } from '../../core/helpers';
import {
  loginUserMutation,
  registerUserMutation,
} from '../../core/apiFunctions';

export type UserInput = {
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
    mutationFn: registerUserMutation,
  });

  const register = async (user: UserInput) => {
    try {
      const res = await registerMutation.mutateAsync(user);
      window.localStorage.setItem('token', res);
      const userToken = decodeToken(res);
      if (userToken) dispatch({ type: 'LOGIN', payload: userToken });
    } catch (e) {
      console.error(
        'Error registering user: ',
        e instanceof Error ? e?.message : e,
      );
    }
  };

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUserMutation,
  });

  const login = async (user: UserInput) => {
    try {
      const token = await loginMutation.mutateAsync(user);
      window.localStorage.setItem('token', token);
      const userToken = decodeToken(token);
      if (userToken)
        dispatch({ type: 'LOGIN', payload: { token, user: userToken } });
    } catch (e) {
      console.error('Error logging in: ', e instanceof Error ? e?.message : e);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return {
    token: state.token,
    user: state.user,
    loggedIn: state.loggedIn,
    login,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    register,
    registerLoading: registerMutation.isPending,
    registerError: registerMutation.error,
    logout,
  };
};
