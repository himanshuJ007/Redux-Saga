import APIService from './APIService';

class CartService {
  static fetchCart(cartId) {
    if (cartId) {
      return APIService.get(`/cart/active?cartId=${cartId}`);
    }
    return APIService.get(`/cart/active`);
  }

  static updateCart(payload) {
    return APIService.post(`/cart/create`, payload);
  }

  static removeCart(payload) {
    return APIService.post(`/cart/remove`, payload);
  }

  static applyCoupon(coupon, cartId) {
    return APIService.post('/cart/apply-coupon', { coupon, cartId });
  }

  static removeCoupon(cartId) {
    return APIService.post('/cart/remove-coupon', { cartId });
  }

  static createOrder(data) {
    return APIService.post('/order/create', data);
  }

  static createNewOrder(data) {
    return APIService.post('/order/create-new', data);
  }

  static createNewOrderWithoutLogin(data) {
    return APIService.post('/order/create-new-without-login', data);
  }

  static checkIsValid() {
    return APIService.get('/cart/is-valid-cart');
  }

  static paymentResponse(id, data) {
    return APIService.put(`/order/payment-response/${id}`, data);
  }

  // static paymentResponseUserUpdate(data) {
  //   return APIService.post(`/order/payment-response-user-update`, data);
  // }

  static paymentZeroResponse(id) {
    return APIService.put(`/order/payment-zero-response/${id}`);
  }

  static getPendingOrder() {
    return APIService.get('/order/pending');
  }
}

export default CartService;
