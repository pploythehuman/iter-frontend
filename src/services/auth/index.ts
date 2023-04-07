import { apiGet, apiPost } from '../api';

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

const login = async (data: LoginData) => {
  const response = await apiPost<LoginData, { token: string }>('user/login/', data);
  if (response.status === 200 && response.data) {
    localStorage.setItem('auth', response.data.token);
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

export {
  login,
  register,
  forgotPassword
};