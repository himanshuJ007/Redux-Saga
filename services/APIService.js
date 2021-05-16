// const BASE_URL = process.env.BASE_URL || 'http://api.future-tayari.qa2.xencov.net/v1';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3002/v1';
// const BASE_URL = process.env.BASE_URL || 'https://api.futuretayari.com/v1';
// console.log('BASE URL', BASE_URL);
​
var stringify = require('json-stringify-safe');
​
class APIService {
  constructor() {
    if (!APIService.instance) {
      APIService.instance = this;
    }
​
    return APIService.instance;
  }
​
  getHeaders = () => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
​
    const authToken = window.localStorage.getItem('accessToken');
    if (authToken) {
      headers.Authorization = authToken;
    }
​
    return headers;
  };
​
  getFileHeaders = () => {
    const headers = {};
​
    const authToken = window.localStorage.getItem('accessToken');
    if (authToken) {
      headers.Authorization = authToken;
    }
​
    return headers;
  };
​
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + url, {
        method: 'GET',
        headers: this.getHeaders(),
      })
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
  }
​
  post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
  }
​
  put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + url, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: stringify(data),
      })
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
  }
​
  postFile(url, data) {
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + url, {
        method: 'POST',
        headers: this.getFileHeaders(),
        body: data,
      })
        .then(response => response.json())
        .then(resolve)
        .catch(reject);
    });
  }
​
  upload(url, type, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': type,
        },
        body: data,
      })
        .then(response => response)
        .then(resolve)
        .catch(reject);
    });
  }
}
​
const instance = new APIService();
Object.freeze(instance);
export default instance;
