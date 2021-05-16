import { generateQueryString } from 'utils/methods';
import APIService from './APIService';

class ProductService {
  static signupList(email) {
    return APIService.post(`/user/email-subscription`, email);
  }
}

export default ProductService;
