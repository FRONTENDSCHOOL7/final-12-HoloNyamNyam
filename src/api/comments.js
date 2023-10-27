import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const commentUploadApi = async (id, content, token) => {
  const res = await axios.post(
    `${BASE_URL}/post/${id}/comments`,
    {
      comment: {
        content: content,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return res;
};

export const commentListApi = async ({ id, token, limit = 10, skip = 0 }) => {
  const res = await axios.get(
    `${BASE_URL}/post/${id}/comments/?limit=${limit}&skip=${skip}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    },
  );
  return res;
};

export const commentDeleteApi = async (feedId, commentId, token) => {
  await axios.delete(`${BASE_URL}/post/${feedId}/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const commentReportApi = async (feedId, commentId, token) => {
  await axios.post(`${BASE_URL}/post/${feedId}/comments/${commentId}/report`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
