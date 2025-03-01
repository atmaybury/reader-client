import { Subscription } from '../components/Home';
import config from '../config';
import { UserInput } from '../contexts/authorizationContext/useAuthorization';

export const registerUserMutation = (user: UserInput) =>
  fetch(`${config.API_PATH}/register`, {
    method: 'POST',
    body: JSON.stringify(user),
  }).then(async (res) =>
    res.text().then((body) => {
      if (!res.ok) throw new Error(body || 'Unknown error');
      return body;
    }),
  );

export const loginUserMutation = (user: UserInput) =>
  fetch(`${config.API_PATH}/login`, {
    method: 'POST',
    body: JSON.stringify(user),
  }).then(async (res) =>
    res.text().then((body) => {
      if (!res.ok) throw new Error(body || 'Unknown error');
      return body;
    }),
  );

export const getUserSubscriptionsQuery = async (token: string) =>
  fetch(`${config.API_PATH}/user-subscriptions`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async (res) =>
    res.text().then((body) => {
      if (!res.ok) throw new Error(body || 'Unknown error');
      return JSON.parse(body) as Subscription[];
    }),
  );
