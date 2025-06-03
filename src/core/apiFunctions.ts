import config from '../config';
import {
  UserInput,
  UserLoginInput,
} from '../contexts/authorizationContext/useAuthorization';
import {
  Folder,
  Subscription,
  SubscriptionTag,
} from '../contexts/readerContext/ReaderContext';

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

export const loginUserRequest = (user: UserLoginInput) =>
  fetch(`${config.API_PATH}/login`, {
    method: 'POST',
    body: JSON.stringify(user),
  }).then(async (res) =>
    res.text().then((body) => {
      if (!res.ok) throw new Error(body || 'Unknown error');
      return body;
    }),
  );

export const getUserFoldersRequest = async () => {
  const token = window.localStorage.getItem('token');

  return fetch(`${config.API_PATH}/user-folders`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async (res) =>
    res.text().then((body) => {
      if (!res.ok) throw new Error(body || 'Unknown error');
      return JSON.parse(body) as Folder[];
    }),
  );
};

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
      return JSON.parse(body) as SubscriptionTag[];
    }),
  );
};

export const addSubscriptionsRequest = async (
  subscriptionTags: SubscriptionTag[],
) => {
  const token = window.localStorage.getItem('token');

  return fetch(`${config.API_PATH}/add-subscriptions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriptionTags),
  }).then(async (res) =>
    res.text().then((body) => {
      if (!res.ok) throw new Error(body || 'Unknown error');
      return JSON.parse(body) as Subscription[];
    }),
  );
};

export const deleteSubscriptionsRequest = async (ids: number[]) => {
  const token = window.localStorage.getItem('token');

  return fetch(`${config.API_PATH}/delete-subscriptions`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ids),
  }).then(async (res) =>
    res.text().then((body) => {
      if (!res.ok) throw new Error(body || 'Unknown error');
      return JSON.parse(body) as number[];
    }),
  );
};

export const fetchFeedRequest = async (url: string) => {
  const token = window.localStorage.getItem('token');

  return fetch(`${config.API_PATH}/fetch-feed?href=${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async (res) =>
    res.text().then((body) => {
      if (!res.ok) throw new Error(body || 'Unknown error');
      return JSON.parse(body);
    }),
  );
};
