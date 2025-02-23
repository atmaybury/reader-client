import { useMutation } from '@tanstack/react-query';
import {
  useAuthorizationDispatchContext,
  useAuthorizationStateContext,
} from './AuthorizationContext';
import config from '../../config';
import { LoginUserInput } from '../../LoginForm';
import { decodeToken } from '../../core/helpers';
import { SubmitUserInput } from '../../RegisterForm';

/**
 * Hook for interacting with the AuthorizationContext
 */
export const useAuthorization = () => {
  const state = useAuthorizationStateContext();
  const dispatch = useAuthorizationDispatchContext();

  /* MUTATIONS */
  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: (user: SubmitUserInput) =>
      fetch(`${config.API_PATH}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
      }).then((res) => res.text()),
  });

  const register = async (user: SubmitUserInput) => {
    const res = await registerMutation.mutateAsync(user);
    window.localStorage.setItem('token', res);
    const userToken = decodeToken(res);
    if (userToken) dispatch({ type: 'LOGIN', payload: userToken });
  };

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (user: LoginUserInput) =>
      fetch(`${config.API_PATH}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
      }).then((res) => res.text()),
  });

  const login = async (user: LoginUserInput) => {
    const res = await loginMutation.mutateAsync(user);
    window.localStorage.setItem('token', res);
    const userToken = decodeToken(res);
    if (userToken) dispatch({ type: 'LOGIN', payload: userToken });
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return {
    user: state.user,
    loggedIn: !!state.user,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    login,
    register,
    registerLoading: registerMutation.isPending,
    registerError: registerMutation.error,
    logout,
  };
};
