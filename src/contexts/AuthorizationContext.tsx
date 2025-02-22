import React, {
  createContext,
  useContext,
  useReducer,
} from 'react';

type AuthorizationState = {
  token?: string
}

const defaultAuthorizationState: AuthorizationState = {
  token: undefined
}


/* Action types */

type LoginAction = {
  type: 'LOGIN'
  payload: string
}


type AuthorizationReducerAction =
  | LoginAction;

const authorizationReducer = (state: AuthorizationState, action: AuthorizationReducerAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const AuthorizationStateContext = createContext(defaultAuthorizationState);
const AuthorizationDispatchContext = createContext<React.Dispatch<AuthorizationReducerAction>>(
  () => { }
);

type Props = {
  children: React.ReactNode;
};

export const AuthorizationProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authorizationReducer, defaultAuthorizationState);

  return (
    <AuthorizationStateContext.Provider value={state}>
      <AuthorizationDispatchContext.Provider value={dispatch}>
        {children}
      </AuthorizationDispatchContext.Provider>
    </AuthorizationStateContext.Provider>
  );
};

export const useAuthorizationStateContext = () => useContext(AuthorizationStateContext);
export const useAuthorizationDispatchContext = () => useContext(AuthorizationDispatchContext);
