import APIService from './APIService';

class BlogService {
  static getBlogs() {
    return APIService.get(`/blog/get-blogs`);
  }

  static getBlogDetails(id) {
    return APIService.get(`/blog/${id}`);
  }
}

export default BlogService;
