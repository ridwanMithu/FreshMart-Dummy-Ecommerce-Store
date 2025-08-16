import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User } from 'lucide-react';
import { login, User as UserType } from '@/lib/auth';

interface LoginDialogProps {
  onLogin: (user: UserType) => void;
}

export default function LoginDialog({ onLogin }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    const user = login(email, password);
    if (user) {
      onLogin(user);
      setIsOpen(false);
      setEmail('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials. Try user@freshmart.com or admin@freshmart.com with password 12345');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-100">
          <User className="w-5 h-5 mr-2" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login to FreshMart</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          <div className="bg-blue-50 p-3 rounded text-sm">
            <p className="font-semibold mb-1">Demo Accounts:</p>
            <p>User: user@freshmart.com</p>
            <p>Admin: admin@freshmart.com</p>
            <p>Password: 12345 (for both)</p>
          </div>
          <Button onClick={handleLogin} className="w-full bg-green-600 hover:bg-green-700">
            Login
          </Button>
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-green-600 hover:underline">
              Register here
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}