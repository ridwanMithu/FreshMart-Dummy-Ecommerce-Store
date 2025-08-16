import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  Search,
  Heart,
  Star,
  Menu,
  User,
  LogOut,
  Filter,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';
import LoginDialog from '@/components/LoginDialog';
import AdminPanel from '@/components/AdminPanel';
import { getCurrentUser, logout, isAdmin, User as UserType } from '@/lib/auth';
import { getProducts, searchProducts, getProductsByCategory, Product } from '@/lib/products';

interface FilterOptions {
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc' | 'name-desc';
}

const categories = [
  'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive'
];

export default function HomePage() {
  const [cartItems, setCartItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    minPrice: null,
    maxPrice: null,
    minRating: null,
    sortBy: 'rating-desc'
  });

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    loadProducts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory, products, filterOptions]);

  const loadProducts = () => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setDisplayProducts(allProducts);
  };

  const handleSearch = () => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const searchResults = searchProducts(searchQuery);
      filtered = filtered.filter(p => searchResults.some(r => r.id === p.id));
    }
    
    // Apply price filters
    if (filterOptions.minPrice !== null) {
      filtered = filtered.filter(p => p.price >= filterOptions.minPrice!);
    }
    
    if (filterOptions.maxPrice !== null) {
      filtered = filtered.filter(p => p.price <= filterOptions.maxPrice!);
    }
    
    // Apply rating filter
    if (filterOptions.minRating !== null) {
      filtered = filtered.filter(p => p.rating >= filterOptions.minRating!);
    }
    
    // Apply sorting
    switch (filterOptions.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    
    setDisplayProducts(filtered);
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleProductAdded = () => {
    loadProducts();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-400/50 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                FreshMart
              </div>
              
              {/* Filter Button */}
              <div className="flex items-center">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
            
            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-white border border-green-200 rounded-lg p-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filterOptions.minPrice || ''}
                        onChange={(e) => setFilterOptions({
                          ...filterOptions,
                          minPrice: e.target.value ? parseFloat(e.target.value) : null
                        })}
                        className="w-full"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filterOptions.maxPrice || ''}
                        onChange={(e) => setFilterOptions({
                          ...filterOptions,
                          maxPrice: e.target.value ? parseFloat(e.target.value) : null
                        })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  {/* Minimum Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                    <select
                      value={filterOptions.minRating || ''}
                      onChange={(e) => setFilterOptions({
                        ...filterOptions,
                        minRating: e.target.value ? parseFloat(e.target.value) : null
                      })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">Any Rating</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="2">2+ Stars</option>
                      <option value="1">1+ Stars</option>
                    </select>
                  </div>
                  
                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                      value={filterOptions.sortBy}
                      onChange={(e) => setFilterOptions({
                        ...filterOptions,
                        sortBy: e.target.value as FilterOptions['sortBy']
                      })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="rating-desc">Rating: High to Low</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                    </select>
                  </div>
                  
                  {/* Apply Button */}
                  <div className="flex items-end">
                    <Button
                      onClick={handleSearch}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border-green-200 focus:border-green-400 focus:ring-green-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  size="sm" 
                  onClick={handleSearch}
                  className="absolute right-1 top-1 bg-green-600 hover:bg-green-700"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <span className="text-sm text-green-700">
                    Welcome, {currentUser.name}!
                  </span>
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-100">
                      <User className="w-5 h-5 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  {isAdmin() && <AdminPanel onProductAdded={handleProductAdded} />}
                  <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-100">
                    <Heart className="w-5 h-5 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" size="sm" className="relative text-green-700 hover:text-green-800 hover:bg-green-100">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                    {cartItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1 py-0 min-w-[1.2rem] h-5 rounded-full">
                        {cartItems}
                      </Badge>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="text-green-700 hover:text-green-800 hover:bg-green-100"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <LoginDialog onLogin={handleLogin} />
                  <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-100">
                    <Heart className="w-5 h-5 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" size="sm" className="relative text-green-700 hover:text-green-800 hover:bg-green-100">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                    {cartItems > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1 py-0 min-w-[1.2rem] h-5 rounded-full">
                        {cartItems}
                      </Badge>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Categories Bar */}
      <div className="bg-green-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 overflow-x-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedCategory('')}
              className={`text-white hover:bg-green-700 whitespace-nowrap ${!selectedCategory ? 'bg-green-700' : ''}`}
            >
              <Menu className="w-4 h-4 mr-2" />
              All Categories
            </Button>
            {categories.map((category) => (
              <Button 
                key={category} 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCategorySelect(category)}
                className={`text-white hover:bg-green-700 whitespace-nowrap ${selectedCategory === category ? 'bg-green-700' : ''}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fresh Deals Every Day
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Discover amazing products at unbeatable prices
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Shop Now
          </Button>
        </div>
      </div>

      {/* Search Results / Products */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory ? `${selectedCategory} Products` : 'Featured Products'}
          </h2>
          <p className="text-gray-600">
            {displayProducts.length} products found
          </p>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="block">
                <Card className="group hover:shadow-lg transition-all duration-300 border-green-100 hover:border-green-300 h-full">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          {product.discount}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2 bg-green-100 text-green-800">
                      {product.category}
                    </Badge>
                    <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart();
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">FreshMart</h3>
              <p className="text-gray-300 mb-4">
                Your trusted online marketplace for quality products at affordable prices.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-green-400">
                  Facebook
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-green-400">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-green-400">
                  Instagram
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Customer Service</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-green-400">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400">Returns</a></li>
                <li><a href="#" className="hover:text-green-400">Shipping Info</a></li>
                <li><a href="#" className="hover:text-green-400">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-green-400">About</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-green-400">About Us</a></li>
                <li><a href="#" className="hover:text-green-400">Careers</a></li>
                <li><a href="#" className="hover:text-green-400">Press</a></li>
                <li><a href="#" className="hover:text-green-400">Sustainability</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-green-400">Connect</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-green-400">Newsletter</a></li>
                <li><a href="#" className="hover:text-green-400">Mobile App</a></li>
                <li><a href="#" className="hover:text-green-400">Gift Cards</a></li>
                <li><a href="#" className="hover:text-green-400">Affiliate Program</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 FreshMart. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}