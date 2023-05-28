import { apiGet, apiPost } from '../api';
import { getProfile } from '../profile';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  password2: string
  tc: any;
}

interface ForgotPasswordData {
  email: string;
}

interface LoginResponse {
  token: {
    refresh: string,
    access: string
  },
  msg: string
}

const login = async (data: LoginData) => {
  const response = await apiPost<LoginData, LoginResponse>('user/login/', data);
  if (response.status === 200 && response.data) {
    localStorage.setItem('auth', response.data.token.access);

    const profile = await getProfile();
    localStorage.setItem('firstname', profile?.firstname);
    localStorage.setItem('lastname', profile?.lastname);
  }
  return response;
};

const register = async (data: RegisterData) => {
  const response = await apiPost<RegisterData, { message: string }>('user/register/', data);
  return response;
};

const forgotPassword = async (data: ForgotPasswordData) => {
  const response = await apiPost<ForgotPasswordData, { message: string }>('user/request-password-reset/', data);
  return response;
};

const logout = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('firstname');
  localStorage.removeItem('lastname');
};

export {
  login,
  register,
  forgotPassword,
  logout,
};