import { apiGet, apiPost, apiDelete } from "../api";

const getProfile = async () => {
  const response = await apiGet(`/user/profile/`);
  return response.data;
};

export {
  getProfile,
};
  