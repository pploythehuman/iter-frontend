import { apiGet, apiPost, apiDelete } from "../api";

const getProfile = async () => {
  const response = await apiGet(`/user/profile/`);
  return response.data;
};

const getIdFromEmail = async (email: string) => {
  const response = await apiGet(`/user/profile/email-to-id/?email=${email}`);
  return response.data;
};

export {
  getProfile,
  getIdFromEmail,
};
  