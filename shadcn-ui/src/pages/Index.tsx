import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search, Heart, Star, Menu, User, LogOut } from 'lucide-react';
import LoginDialog from '@/components/LoginDialog';
import AdminPanel from '@/components/AdminPanel';
import { getCurrentUser, logout, isAdmin, User as UserType } from '@/lib/auth';
import { getProducts, searchProducts, getProductsByCategory, Product } from '@/lib/products';

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

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    loadProducts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory, products]);

  const loadProducts = () => {
    const allProducts = getProducts();
    setProducts(allProducts);
    setDisplayProducts(allProducts);
  };

  const handleSearch = () => {
    let filtered = products;
    
    if (selectedCategory) {
      filtered = getProductsByCategory(selectedCategory);
    }
    
    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery);
      if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }
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
            </div>

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
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-green-100 hover:border-green-300">
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
                    onClick={addToCart}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
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