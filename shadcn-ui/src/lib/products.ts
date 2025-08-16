export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  discount?: string;
}

// Simple product list without localStorage
const productList: Product[] = [
  {
    "id": "1",
    "name": "Smartphone Pro",
    "price": 799.99,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1554481600-a51e0a1f8c6b?w=400&h=400&fit=crop",
    "description": "The latest flagship smartphone with advanced features.",
    "rating": 4.9,
    "reviews": 450
  },
  {
    "id": "2",
    "name": "Wireless Earbuds",
    "price": 129.99,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1550620703-8f5c7b4a3b8b?w=400&h=400&fit=crop",
    "description": "High-quality wireless earbuds for music lovers.",
    "rating": 4.8,
    "reviews": 350
  },
  {
    "id": "3",
    "name": "Gaming Laptop",
    "price": 1499.99,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1556234929-1f4d01a7d0f9?w=400&h=400&fit=crop",
    "description": "Powerful gaming laptop for serious gamers.",
    "rating": 4.7,
    "reviews": 320
  },
  {
    "id": "4",
    "name": "Smart Watch",
    "price": 249.99,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1508704019889-8e3f5a4e3d8e?w=400&h=400&fit=crop",
    "description": "Smart watch with fitness tracking features.",
    "rating": 4.6,
    "reviews": 280
  },
  {
    "id": "5",
    "name": "Bluetooth Speaker",
    "price": 99.99,
    "category": "Electronics",
    "image": "https://images.unsplash.com/photo-1556234929-1f4d01a7d0f9?w=400&h=400&fit=crop",
    "description": "Portable Bluetooth speaker for outdoor use.",
    "rating": 4.5,
    "reviews": 250
  }
];

export const getProducts = (): Product[] => {
  return productList;
};

export const getProductById = (id: string): Product | undefined => {
  return productList.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return productList.filter(
    product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
};

export const getProductsByCategory = (category: string): Product[] => {
  return productList.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  const categories = productList.map(product => product.category);
  return Array.from(new Set(categories));
};

export const addProduct = (product: Omit<Product, 'id'>): void => {
  // In a real app, this would add to localStorage or a database
  // For now, we'll just log to console
  console.log("Adding product:", product);
};