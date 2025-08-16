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

const PRODUCTS_KEY = 'freshmart_products';

// Initialize products from productData.json
const initializeProducts = () => {
  // Check if products already exist in localStorage
  const existingProducts = localStorage.getItem(PRODUCTS_KEY);
  if (existingProducts) {
    return;
  }

  // In a real application, you would fetch this from a file or API
  // For now, we'll use a simplified version of the products
  const productList = [
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
    },
    {
      "id": "6",
      "name": "Smart Home Hub",
      "price": 199.99,
      "category": "Electronics",
      "image": "https://images.unsplash.com/photo-1510194846138-bf06dc9da5c1?w=400&h=400&fit=crop",
      "description": "Central hub for smart home devices.",
      "rating": 4.4,
      "reviews": 220
    },
    {
      "id": "7",
      "name": "VR Headset",
      "price": 399.99,
      "category": "Electronics",
      "image": "https://images.unsplash.com/photo-1510194846138-bf06dc9da5c1?w=400&h=400&fit=crop",
      "description": "Virtual reality headset for immersive gaming.",
      "rating": 4.3,
      "reviews": 200
    },
    {
      "id": "8",
      "name": "Drone Camera",
      "price": 499.99,
      "category": "Electronics",
      "image": "https://images.unsplash.com/photo-1510194846138-bf06dc9da5c1?w=400&h=400&fit=crop",
      "description": "High-resolution drone camera for aerial photography.",
      "rating": 4.2,
      "reviews": 180
    },
    {
      "id": "9",
      "name": "Action Camera",
      "price": 299.99,
      "category": "Electronics",
      "image": "https://images.unsplash.com/photo-1510194846138-bf06dc9da5c1?w=400&h=400&fit=crop",
      "description": "Rugged action camera for sports and adventures.",
      "rating": 4.1,
      "reviews": 160
    },
    {
      "id": "10",
      "name": "Smart Plug",
      "price": 39.99,
      "category": "Electronics",
      "image": "https://images.unsplash.com/photo-1510194846138-bf06dc9da5c1?w=400&h=400&fit=crop",
      "description": "Smart plug for remote control of home appliances.",
      "rating": 4.0,
      "reviews": 140
    },
    {
      "id": "11",
      "name": "Organic Cotton T-Shirt",
      "price": 24.99,
      "category": "Fashion",
      "image": "https://images.unsplash.com/photo-1554191456-a63c94d2b9b1?w=400&h=400&fit=crop",
      "description": "Soft and comfortable organic cotton t-shirt.",
      "rating": 4.9,
      "reviews": 450
    },
    {
      "id": "12",
      "name": "Denim Jeans",
      "price": 49.99,
      "category": "Fashion",
      "image": "https://images.unsplash.com/photo-1554191456-a63c94d2b9b1?w=400&h=400&fit=crop",
      "description": "Stylish and durable denim jeans.",
      "rating": 4.8,
      "reviews": 350
    },
    {
      "id": "13",
      "name": "Leather Boots",
      "price": 129.99,
      "category": "Fashion",
      "image": "https://images.unsplash.com/photo-1554191456-a63c94d2b9b1?w=400&h=400&fit=crop",
      "description": "Premium leather boots for a classic look.",
      "rating": 4.7,
      "reviews": 320
    },
    {
      "id": "14",
      "name": "Silk Dress",
      "price": 89.99,
      "category": "Fashion",
      "image": "https://images.unsplash.com/photo-1554191456-a63c94d2b9b1?w=400&h=400&fit=crop",
      "description": "Elegant silk dress for special occasions.",
      "rating": 4.6,
      "reviews": 280
    },
    {
      "id": "15",
      "name": "Wool Sweater",
      "price": 69.99,
      "category": "Fashion",
      "image": "https://images.unsplash.com/photo-1554191456-a63c94d2b9b1?w=400&h=400&fit=crop",
      "description": "Warm and cozy wool sweater.",
      "rating": 4.5,
      "reviews": 250
    },
    {
      "id": "16",
      "name": "Sunglasses",
      "price": 39.99,
      "category": "Fashion",
      "image": "https://images.unsplash.com/photo-1554191456-a63c94d2b9b1?w=400&h=400&fit=crop",
      "description": "Stylish sunglasses for sunny days.",
      "rating": 4.4,
      "reviews": 220
    },
    {
      "id": "17",
      "name": "Belt",
      "price": 29.99,
      "category": "Fashion",
      "image": "https://images.unsplash.com/photo-1554191456-a63c94d2b9b1?w=400&h=400&fit=crop",
      "description": "Leather belt for a polished look.",
      "rating": 4.3,
      "reviews": 200
    },
    {
      "id": "18",
      "name": "Hat",
      "price": 19.99,
      "category": "Fashion",
      "image": "https://images.unsplash.com/photo-1554191456-a63c94d2b9b1?w=400&h=400&fit=crop",
      "description": "Trendy hat for a fashionable touch.",
      "rating": 4.2,
      "reviews": 180
    },
    {
      "id": "19",
      "name": "Scarf",
      "price": 24.99,
      "category": "Fashion",
      "image": "https://images.unsplash.com/photo-1554191456-a63c94d2b9b1?w=400&h=400&fit=crop",
      "description": "Soft scarf for a cozy accessory.",
      "rating": 4.1,
      "reviews": 160
    },
    {
      "id": "20",
      "name": "Gloves",
      "price": 29.99,
      "category": "Fashion",
      "image": "https://images.unsplash.com/photo-1554191456-a63c94d2b9b1?w=400&h=400&fit=crop",
      "description": "Warm gloves for cold weather.",
      "rating": 4.0,
      "reviews": 140
    }
  ];
  
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productList));
};

export const getProducts = (): Product[] => {
  initializeProducts();
  const products = localStorage.getItem(PRODUCTS_KEY);
  return products ? JSON.parse(products) : [];
};

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const products = getProducts();
  const lowerQuery = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
};

export const getProductsByCategory = (category: string): Product[] => {
  const products = getProducts();
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  const products = getProducts();
  const categories = products.map(product => product.category);
  return Array.from(new Set(categories));
};

export const addProduct = (product: Omit<Product, 'id'>): void => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString()
  };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};