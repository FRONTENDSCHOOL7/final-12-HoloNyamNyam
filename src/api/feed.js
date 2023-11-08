import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const feed = async ({ token, limit = 10, skip = 0 }) => {
  const query = `?limit=${limit}&skip=${skip}`;
  const res = await axios.get(`${BASE_URL}/post/feed/${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  return res;
};

export const feedUploadApi = async (content, image, token) => {
  await axios.post(
    `${BASE_URL}/post`,
    {
      post: {
        content: content,
        image: image,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  );
};

export const feedInfoApi = async (feedId, token) => {
  const res = await axios.get(`${BASE_URL}/post/${feedId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  return res;
};

export const feedEditApi = async ({ feedId, token, content, image }) => {
  const res = await axios.put(
    `${BASE_URL}/post/${feedId}`,
    {
      post: {
        content: content,
        image: image,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  );
  return res;
};

export const feedDeleteApi = async (feedId, token) => {
  await axios.delete(`${BASE_URL}/post/${feedId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const feedReportApi = async (feedId, token) => {
  await axios.post(
    `${BASE_URL}/post/${feedId}/report`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  );
};

export const feedLikeApi = async (feedId, token) => {
  await axios.post(
    `${BASE_URL}/post/${feedId}/heart`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  );
};

export const feedUnlikeApi = async (feedId, token) => {
  await axios.delete(`${BASE_URL}/post/${feedId}/unheart`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const userFeedListApi = async (accountname, token, limit, skip) => {
  const query = `?limit=${limit}&skip=${skip}`;
  const res = await axios.get(
    `${BASE_URL}/post/${accountname}/userpost/${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  );
  return res;
};
