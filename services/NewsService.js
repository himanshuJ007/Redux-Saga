import APIService from './APIService';

class NewsService {
  static getNews() {
    return APIService.get(`/news`);
  }
}

export default NewsService;
