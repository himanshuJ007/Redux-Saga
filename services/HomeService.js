import APIService from './APIService';

class HomeService {
  getCourses(limit, offset) {
    return APIService.get(`/course/get-courses?limit=${limit || 10}&offset=${offset || 0}`);
  }

  downloadCertificate(data) {
    return APIService.post(`/certificate/download-certificate`, data);
  }

  getCoursesComingSoon(limit, offset) {
    return APIService.get(`/course/get-courses-coming-soon?limit=${limit || 10}&offset=${offset || 0}`);
  }

  getPodcasts(limit, offset) {
    return APIService.get(
      `/podcast/active?limit=${limit || 3}&offset=${offset || 0}`,
    );
  }

  getCourse(id) {
    return APIService.get(`/course/web/${id}`);
  }

  getQa(id) {
    return APIService.get(`/question-answer/course/${id}`);
  }

  addQa(id, data) {
    return APIService.post(`/question-answer/add-msg/${id}`, data);
  }

  getPurchasedCourse(id) {
    return APIService.get(
      `/student-enrolled-course/student-progress?course=${id}`,
    );
  }

  updateContentOfPurchasedCourse(data) {
    return APIService.put(`/student-enrolled-course/update-content`, data);
  }

  startCourse(courseId) {
    return APIService.put(`/student-enrolled-course/start-course`, {
      courseId,
    });
  }

  updateQuiz(data) {
    return APIService.put(`/student-enrolled-course/update-quiz`, data);
  }

  fetchDegrees(data) {
    return APIService.get(`/degree/get-all`, data);
  }

  getPresignedUrl(name) {
    return APIService.get(`/auth/get-cloudfront-presigned-url?name=${name}`);
  }

  getUnlockedContentLink(data) {
    return APIService.get(`/auth/get-unlocked-content-url?courseId=${data && data.courseId}&chapterId=${data && data.chapterId}&contentId=${data && data.contentId}`);
  }

  getStarTransaction(data) {
    return APIService.get(`/star-transaction/get-star-transaction?studentEnrolledCourse=${data.enrollmentId}&contentId=${data.contentId}`);
  }

  fetchPurchasedCourses() {
    return APIService.get(`/student-enrolled-course/get-purchased-list`);
  }

  fetchContent() {
    return APIService.get(`/content/get-content`);
  }

  toggleSaveCourse(id) {
    return APIService.put(`/student/toggle-save-courses`, { courseId: id });
  }

  fetchSavedCourses() {
    return APIService.get(`/student/fetch-saved-courses`);
  }

  fetchDashboardDetails() {
    return APIService.get(`/student-enrolled-course/dashboard`);
  }

  getStarValue() {
    return APIService.get(`/star/get-latest`);
  }

  getAllStarPrice() {
    return APIService.get(`/star-transaction/get-star-value`);
  }

  fetchNotifications() {
    return APIService.get('/notification/user');
  }

  viewNotification(data, id) {
    return APIService.put(`/notification/${id}`, data);
  }

  getBookmark(courseId, studentEnrolledCourse) {
    return APIService.get(
      `/bookmark/get-bookmark?course=${courseId}&studentEnrolledCourse=${studentEnrolledCourse}`,
    );
  }

  updateBookmark(data) {
    return APIService.put(`/bookmark/update-bookmark`, data);
  }

  addDownloadTime(data) {
    return APIService.put(`/student/add-download-time`, data);
  }

  creditStarsToStudent(data) {
    return APIService.post('/star-transaction/student', data);
  }
}

const instance = new HomeService();
export default instance;
