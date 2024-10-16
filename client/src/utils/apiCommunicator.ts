import axios from 'axios';

// User Register POST /api/v1/users/register
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post('/users/register', {
    name: name,
    email: email,
    password: password,
  });

  if (res.status !== 201) {
    throw new Error('Unable to register!');
  }

  const data = await res.data;
  return data;
};

// User Login POST /api/v1/users/login
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post('/users/login', {
    email: email,
    password: password,
  });

  if (res.status !== 200) {
    throw new Error('Unable to login!');
  }

  const data = await res.data;
  return data;
};

// Verify token GET /api/v1/users/auth-status
export const checkAuthStatus = async () => {
  const res = await axios.get('/users/auth-status');

  if (res.status !== 200) {
    throw new Error('Unable to auhtenticate!');
  }

  const data = await res.data;
  return data;
};

// Logout GET /api/v1/users/logout
export const logoutUser = async () => {
  const res = await axios.get('/users/logout');

  if (res.status !== 200) {
    throw new Error('Unable to logout');
  }
  const data = await res.data;
  return data;
};

// Send message POST /api/v1/chats
export const sendMessageRequest = async (message: string) => {
  const res = await axios.post('/chats', { message });

  if (res.status !== 201) {
    throw new Error('Unable to send message!');
  }

  const data = await res.data;
  return data;
};

// Retrieve chats GET /api/v1/chats
export const getUserChats = async () => {
  const res = await axios.get('/chats');

  if (res.status !== 200) {
    throw new Error('Unable to retrieve chats!');
  }

  const data = await res.data;
  return data;
};

// Delete chats DELETE /api/v1/chats
export const deleteUserChats = async () => {
  const res = await axios.delete('/chats');

  if (res.status !== 204) {
    throw new Error('Unable to delete chats!');
  }

  const data = await res.data;
  return data;
};
