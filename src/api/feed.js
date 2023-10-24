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

export const FeedUploadApi = async (content, image, token) => {
  await axios.post(
    `${BASE_URL}/post`,
    {
      Feed: {
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

export const FeedInfoApi = async (feedId, token) => {
  const res = await axios.get(`${BASE_URL}/post/${feedId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  return res;
};

export const FeedEditApi = async (feedId, token, content, image) => {
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

export const FeedDeleteApi = async (feedId, token) => {
  await axios.delete(`${BASE_URL}/post/${feedId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
};

export const FeedReportApi = async (feedId, token) => {
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

export const FeedLikeApi = async (feedId, token) => {
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

export const FeedUnlikeApi = async (feedId, token) => {
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
