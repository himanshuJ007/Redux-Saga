import APIService from './APIService';
import { v4 as uuidv4 } from 'uuid';

class UserService {
  static getCurrentUser() {
    return APIService.get(`/student/current`);
  }

  static updateUser(data) {
    return APIService.post(`/student/profile`, data);
  }

  static forgotPassword(email) {
    return APIService.put('/auth/forgot', { email });
  }

  static updatePassword(token, password) {
    return APIService.put('/auth/update-password', { token, password });
  }

  static updateStudentProfileFromModal(data) {
    return APIService.put('/student/update-profile-from-modal', data);
  }

  static updateStudentProfile(data) {
    const payload = {};
    data && Object.keys(data).forEach(item => {
      if (item === 'profileImage') {
        if (data.profileImage && data.profileImage.file) {
          const file = data.profileImage.file;
          payload.profileImage = {
            name: `${uuidv4()}.${file.type.split('/').pop()}`,
            mimeType: file.type,
            uid: file.uid,
          }
        }
      } else {
        if (data[item]) {
          payload[item] = data[item];
        }
      }
    })

    return APIService.put('/student/update-profile', payload);
  }
}

export default UserService;
