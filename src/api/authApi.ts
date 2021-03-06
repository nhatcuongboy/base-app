import axiosClient from './axiosClient';

export const login = async (username: string, password: string) => {
  const response = await axiosClient.post(`/auth/login`, {
    username,
    password,
  });
  return response?.data;
};

export const signUp = async (params: any) => {
  const response = await axiosClient.post(`/auth/sign-up`, params);
  return response?.data;
};

export const getMe = async () => {
  const response = await axiosClient.get(`/auth/user-info`);
  return response?.data;
};
