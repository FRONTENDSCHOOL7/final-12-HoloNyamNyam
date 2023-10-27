import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const ProfileApi = async (accountname, token) => {
  try {
    const res = await axios.get(`${BASE_URL}/profile/${accountname}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
