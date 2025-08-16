import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, ShoppingCart, CreditCard } from 'lucide-react';
import { getCurrentUser, isAuthenticated, User as UserType, updateUserProfile } from '@/lib/auth';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  });
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    } else {
      const user = getCurrentUser();
      setCurrentUser(user);
      if (user) {
        setProfileData({
          name: user.name,
          email: user.email,
        });
      }
      loadOrders();
    }
  }, [navigate]);

  const loadOrders = () => {
    // For now, we'll use mock data
    // In a real application, this would fetch from an API or localStorage
    const mockOrders = [
      {
        id: '1001',
        date: '2023-05-15',
        total: 89.99,
        status: 'Delivered',
        items: [
          { name: 'Wireless Bluetooth Headphones', quantity: 1, price: 79.99 },
          { name: 'Organic Cotton T-Shirt', quantity: 2, price: 24.99 },
        ],
      },
      {
        id: '1002',
        date: '2023-06-22',
        total: 149.99,
        status: 'Processing',
        items: [
          { name: 'Stainless Steel Water Bottle', quantity: 1, price: 19.99 },
          { name: 'Yoga Mat', quantity: 1, price: 34.99 },
        ],
      },
    ];
    setOrders(mockOrders);
  };

  const handleProfileUpdate = () => {
    const updatedUser = updateUserProfile(profileData.name, profileData.email);
    if (updatedUser) {
      setCurrentUser(updatedUser);
      alert('Profile updated successfully!');
    } else {
      alert('Failed to update profile');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <p>Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-100 mr-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Shop
              </Button>
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              FreshMart
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">User Profile</h1>
          <p className="text-gray-600">Manage your account settings and view your order history</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleProfileUpdate} className="bg-green-600 hover:bg-green-700">
                    <User className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No orders found</p>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-green-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                            <p className={`text-sm ${
                              order.status === 'Delivered' ? 'text-green-600' : 
                              order.status === 'Processing' ? 'text-yellow-600' : 
                              'text-gray-500'
                            }`}>
                              {order.status}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <p>{item.name} (x{item.quantity})</p>
                              <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Payment Methods</h3>
                  <p className="text-gray-500 mb-6 text-center">
                    You haven't added any payment methods yet. Add a payment method to checkout faster.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}