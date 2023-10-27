import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const placeListApi = async (accountname, token) => {
  const res = await axios.get(`${BASE_URL}/product/${accountname}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  return res;
};

export const placeUploadApi = async (
  restaurantname,
  rating,
  selectedAddress,
  image,
  token,
) => {
  await axios.post(
    `${BASE_URL}/product`,
    {
      product: {
        itemName: restaurantname,
        price: rating,
        link: selectedAddress,
        itemImage: image,
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

export const getPlaceInfoApi = async (productId, token) => {
  const res = await axios.get(`${BASE_URL}/product/detail/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  return res;
};

export const placeEditApi = async (productId, token, productInfo) => {
  const res = await axios.put(
    `${BASE_URL}/product/${productId}`,
    {
      product: {
        itemName: productInfo.itemName,
        price: productInfo.price,
        link: productInfo.link,
        itemImage: productInfo.itemImage,
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

export const placeDeleteApi = async (productId, token) => {
  await axios.delete(`${BASE_URL}/product/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
};
