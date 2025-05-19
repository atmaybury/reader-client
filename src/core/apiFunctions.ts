import config from '../config';
import { UserInput } from '../contexts/authorizationContext/useAuthorization';
import { Subscription } from '../contexts/readerContext/ReaderContext';

export const registerUserRequest = (user: UserInput) =>
  fetch(`${config.API_PATH}/register`, {
    method: 'POST',
    body: JSON.stringify(user),
  }).then(async (res) =>
    res.text().then((body) => {
      if (!res.ok) throw new Error(body || 'Unknown error');
      return body;
    }),
  );

export const loginUserRequest = (user: UserInput) =>
  fetch(`${config.API_PATH}/login`, {
    method: 'POST',
    body: JSON.stringify(user),
  }).then(async (res) =>
    res.text().then((body) => {
      if (!res.ok) throw new Error(body || 'Unknown error');
      return body;
    }),
  );

export const getUserSubscriptionsRequest = async () => {
  const token = window.localStorage.getItem('token');

  return fetch(`${config.API_PATH}/user-subscriptions`, {
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
};

export const addSubscriptionRequest = async (url: string) => {
  const token = window.localStorage.getItem('token');

  return fetch(`${config.API_PATH}/add-subscription?url=${url}`, {
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
};

export const searchSubscriptionRequest = async (url: string) => {
  const token = window.localStorage.getItem('token');

  return fetch(`${config.API_PATH}/search-subscription?url=${url}`, {
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
};
