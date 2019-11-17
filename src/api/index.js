import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

client.interceptors.response.use(res => {
  return res.data;
});

return client;
