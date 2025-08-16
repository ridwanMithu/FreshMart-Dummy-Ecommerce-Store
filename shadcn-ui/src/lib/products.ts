export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  discount?: string;
  description?: string;
}

const PRODUCTS_KEY = 'freshmart_products';

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    category: 'Electronics',
    discount: '20% OFF',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.'
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.3,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    category: 'Fashion',
    discount: '29% OFF',
    description: 'Comfortable organic cotton t-shirt, perfect for everyday wear.'
  },
  {
    id: '3',
    name: 'Smart Home Speaker',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&h=300&fit=crop',
    category: 'Electronics',
    discount: '25% OFF',
    description: 'Voice-controlled smart speaker with AI assistant and premium audio.'
  },
  {
    id: '4',
    name: 'Yoga Mat Premium',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.4,
    reviews: 891,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
    category: 'Sports',
    discount: '33% OFF',
    description: 'Non-slip yoga mat with extra cushioning for comfortable practice.'
  },
  {
    id: '5',
    name: 'Coffee Maker Deluxe',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 1567,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    category: 'Home & Garden',
    discount: '25% OFF',
    description: 'Programmable coffee maker with built-in grinder and thermal carafe.'
  },
  {
    id: '6',
    name: 'Running Shoes Pro',
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    category: 'Sports',
    discount: '28% OFF',
    description: 'Professional running shoes with advanced cushioning and support.'
  }
];

export const initializeProducts = () => {
  const existingProducts = localStorage.getItem(PRODUCTS_KEY);
  if (!existingProducts) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
  }
};

export const getProducts = (): Product[] => {
  initializeProducts();
  const products = localStorage.getItem(PRODUCTS_KEY);
  return products ? JSON.parse(products) : [];
};

export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString()
  };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const searchProducts = (query: string): Product[] => {
  const products = getProducts();
  if (!query.trim()) return products;
  
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description?.toLowerCase().includes(searchTerm)
  );
};

export const getProductsByCategory = (category: string): Product[] => {
  const products = getProducts();
  if (!category) return products;
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  const products = getProducts();
  const categories = [...new Set(products.map(p => p.category))];
  return categories.sort();
};