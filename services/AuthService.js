import APIService from './APIService';

class AuthService {
  register(data) {
    return APIService.post(`/auth/student-register`, data);
  }

  login(data) {
    return APIService.post(`/auth/student-login`, data);
  }

  forgetPassword(data) {
    return APIService.post(`/auth/student-forgetPassword`, data);
  }

  changePassword(data) {
    return APIService.post(`/auth/student-changePassword`, data);
  }

  loginViaSocial(data) {
    return APIService.post(`/auth/login-social`, data);
  }

  getProfile() {
    return APIService.get(`/profile`);
  }

  verifyAccount(data) {
    return APIService.post(`/verifyAccount`, data);
  }

  resetPassword(data) {
    return APIService.get(`/resetPassword?email=${data}`);
  }

  passwordUpdate(data) {
    return APIService.post(`/passwordUpdate`, data);
  }

  uploadToS3(url, file, type) {
    return APIService.upload(url, type, file);
  }
}

const instance = new AuthService();
export default instance;
