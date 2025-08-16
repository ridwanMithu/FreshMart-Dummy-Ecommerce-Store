export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const CART_KEY = 'freshmart_cart';
const WISHLIST_KEY = 'freshmart_wishlist';

export const getCartItems = (): CartItem[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: any): CartItem => {
  const cartItems = getCartItems();
  const existingItem = cartItems.find(item => item.productId === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItem: CartItem = {
      id: Date.now().toString(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category
    };
    cartItems.push(newItem);
  }
  
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  return existingItem || cartItems[cartItems.length - 1];
};

export const removeFromCart = (productId: string): void => {
  const cartItems = getCartItems().filter(item => item.productId !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
};

export const updateCartQuantity = (productId: string, quantity: number): void => {
  const cartItems = getCartItems();
  const item = cartItems.find(item => item.productId === productId);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
  }
};

export const getCartTotal = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getCartItemCount = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

// Wishlist functions
export const getWishlistItems = (): string[] => {
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

export const addToWishlist = (productId: string): void => {
  const wishlistItems = getWishlistItems();
  if (!wishlistItems.includes(productId)) {
    wishlistItems.push(productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems));
  }
};

export const removeFromWishlist = (productId: string): void => {
  const wishlistItems = getWishlistItems().filter(id => id !== productId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems));
};

export const isInWishlist = (productId: string): boolean => {
  const wishlistItems = getWishlistItems();
  return wishlistItems.includes(productId);
};