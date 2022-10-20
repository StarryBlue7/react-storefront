type Product = {
  _id: string;
  imgURL: string;
  fullName: string;
  shortName: string;
  price: number;
};

type Item = {
  product: Product;
  quantity: number;
};

type Cart = Item[];

type Totals = {
  totalPrice: number;
  totalQty: number;
};

const CART_KEY = "user_cart";

class CartHandler {
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
   * @param {Cart} cart New cart
   */
  setLocal(cart: Cart): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  /**
   * Add to or increment product quantity in cart
   * @param {Cart} prev Previous cart state
   * @param {Product} product Product to be added/incremented
   * @param {number} quantity Optional quantity to add if greater than 1
   * @returns {Cart} Updated cart
   */
  addItem(prev: Cart, product: Product, quantity: number = 1): Cart {
    let added = false;
    const cart = prev.map((item: Item) => {
      if (item.product._id === product._id) {
        added = true;
        const newQty = item.quantity + quantity;
        return { ...item, quantity: newQty };
      }
      return item;
    });
    if (!added) {
      cart.push({ product, quantity });
    }
    return cart;
  }

  /**
   * Update a quantity for a product
   * @param {Cart} prev Previous cart state
   * @param {string} productId ID of product to update
   * @param {number} quantity New quantity
   * @returns {Cart} Updated cart
   */
  updateQty(prev: Cart, productId: string, quantity: number): Cart {
    const cart =
      quantity <= 0
        ? [...prev].filter((item) => item.product._id !== productId)
        : prev.map((item: Item) =>
            item.product._id === productId ? { ...item, quantity } : item
          );
    return cart;
  }

  /**
   * Remove total qty of single product by ID
   * @param {Cart} prev Previous cart state
   * @param {string} productId ID of product to remove
   * @returns {Cart} Updated cart
   */
  deleteItem(prev: Cart, productId: string): Cart {
    const cart = [...prev].filter((item) => item.product._id !== productId);
    return cart;
  }

  /**
   * Get total price & item quantity
   * @param {Cart} cart
   * @returns {Totals} Obj with totalPrice & totalQty
   */
  getTotals(cart: Cart): Totals {
    let totalQty = 0;
    let subtotal = 0;
    cart.forEach((item: Item) => {
      totalQty += item.quantity;
      subtotal += item.product.price * item.quantity;
    }, 0);
    const totalPrice = Number(subtotal.toFixed(2));
    return { totalPrice, totalQty };
  }

  /**
   * Clear cart
   */
  clearAll(): Cart {
    return [];
  }
}

export default new CartHandler();
