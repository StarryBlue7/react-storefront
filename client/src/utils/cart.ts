type Product = {
  product: {
    _id: string;
  };
  quantity: number;
};

type Cart = Product[];

class CartService {
  /**
   * Get cart array of product objects from local storage
   * @return {Cart}
   */
  getLocal(): Cart {
    const cart = localStorage.getItem("user_cart") || "[]";
    return JSON.parse(cart);
  }

  /**
   * Update cart in local storage
   * @param {Cart} cart Updated cart
   */
  setLocal(cart: Cart): void {
    localStorage.setItem("user_cart", JSON.stringify(cart));
  }

  /**
   * Add to or increment product quantity in cart
   * @param {Product} newItem Product to be added/incremented
   * @returns {Cart} Updated cart
   */
  addItem(newItem: Product): Cart {
    const cart = this.getLocal();
    let added = false;
    for (let cartItem of cart) {
      if (cartItem.product._id === newItem.product._id) {
        cartItem.quantity += newItem.quantity;
        this.setLocal(cart);
        added = true;
        break;
      }
    }
    if (!added) {
      cart.push(newItem);
      this.setLocal(cart);
    }
    return this.getLocal();
  }
}

export default new CartService();
