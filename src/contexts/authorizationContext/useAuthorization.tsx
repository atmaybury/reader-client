import { useMutation } from '@tanstack/react-query';
import {
  useAuthorizationDispatchContext,
  useAuthorizationStateContext,
} from './AuthorizationContext';
import { decodeToken } from '../../core/helpers';
import { loginUserRequest, registerUserRequest } from '../../core/apiFunctions';

export type UserLoginInput = {
  email: string;
  password: string;
};

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

  const registerUserMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: registerUserRequest,
  });

  const register = async (user: UserInput) => {
    try {
      const token = await registerUserMutation.mutateAsync(user);
      window.localStorage.setItem('token', token);
      const userToken = decodeToken(token);
      if (userToken)
        dispatch({ type: 'LOGIN', payload: { token, user: userToken } });
    } catch (e) {
      console.error(
        'Error registering user: ',
        e instanceof Error ? e?.message : e,
      );
    }
  };

  const loginUserMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUserRequest,
  });

  const login = async (user: UserLoginInput) => {
    try {
      const token = await loginUserMutation.mutateAsync(user);
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
    loginLoading: loginUserMutation.isPending,
    loginError: loginUserMutation.error,
    register,
    registerLoading: registerUserMutation.isPending,
    registerError: registerUserMutation.error,
    logout,
  };
};
