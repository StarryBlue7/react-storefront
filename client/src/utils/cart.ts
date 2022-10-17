type Product = {
  product: {
    _id: string;
  };
  quantity: number;
};

type Cart = Product[];

const CART_KEY = "user_cart";

class CartService {
  /**
   * Get cart array of product objects from local storage
   * @return {Cart}
   */
  getLocal(): Cart {
    const cart = localStorage.getItem(CART_KEY) || "[]";
    return JSON.parse(cart);
  }

  /**
   * Update cart in local storage
   * @param {Cart} cart Updated cart
   */
  setLocal(cart: Cart): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
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

  /**
   * Remove total qty of single product by ID
   * @param {string} productId ID of product to remove
   * @returns {Cart} Updated cart
   */
  deleteItem(productId: string): Cart {
    const cart = this.getLocal();
    cart.filter((item) => item.product._id !== productId);
    this.setLocal(cart);
    return this.getLocal();
  }

  /**
   * Clear cart in local storage
   */
  clearAll(): void {
    localStorage.removeItem(CART_KEY);
  }
}

export default new CartService();
