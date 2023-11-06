import axios from 'axios';
import { BASE_URL } from './baseUrl';
const DefaultProfileImg = '../images/upload-file.svg';

export const signup = async (formData, data, profileImg) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user`,
      {
        user: {
          username: formData.username,
          email: data.email,
          password: data.password,
          accountname: formData.accountname,
          intro: formData.intro,
          image: profileImg || DefaultProfileImg,
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
    alert(err.response.data.message);
    console.error(err.response.data.message);
  }
};

export const EmailValid = async (email) => {
  const res = await axios.post(
    `${BASE_URL}/user/emailvalid`,
    {
      user: {
        email: email,
      },
    },
    {
      headers: {
        'Content-type': 'application/json',
      },
    },
  );
  return res;
};

export const UserIdValid = async (accountname) => {
  const res = await axios.post(`${BASE_URL}/user/accountnamevalid`, {
    user: {
      accountname: accountname,
    },
    headers: {
      'Content-type': 'application/json',
    },
  });
  return res;
};
