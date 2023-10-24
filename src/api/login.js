import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user/login`,
      {
        user: {
          email: email,
          password: password,
        },
      },
      {
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
    return res;
  } catch (err) {
    // alert(err);
  }
};
