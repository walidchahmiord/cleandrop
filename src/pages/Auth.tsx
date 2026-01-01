import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ShieldCheck, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import heroForest from '@/assets/hero-forest.jpg';

type AuthMode = 'login' | 'signup';
type RoleMode = 'customer' | 'admin';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [roleMode, setRoleMode] = useState<RoleMode>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const success = await login(formData.email, formData.password, roleMode);
        if (success) {
          navigate(roleMode === 'admin' ? '/admin' : '/');
        }
      } else {
        const success = await signup(formData.name, formData.email, formData.password);
        if (success) {
          navigate('/');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={heroForest}
          alt="Nature"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center">
            <h2 className="font-display text-4xl font-medium text-primary-foreground">
              Welcome to CleanDrop
            </h2>
            <p className="mt-4 text-xl text-primary-foreground/80 max-w-md">
              Join the eco-friendly revolution. Clean hands, anywhere you go.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-block mb-8">
            <span className="font-display text-2xl font-semibold text-primary">CleanDrop</span>
          </Link>

          <h1 className="font-display text-3xl font-medium text-foreground">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {mode === 'login'
              ? 'Sign in to your account to continue'
              : 'Join the CleanDrop community today'}
          </p>

          {/* Role Selection - Only for Login */}
          {mode === 'login' && (
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button
                onClick={() => setRoleMode('customer')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  roleMode === 'customer'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Users className={`mx-auto mb-2 ${roleMode === 'customer' ? 'text-primary' : 'text-muted-foreground'}`} size={24} />
                <p className={`font-medium ${roleMode === 'customer' ? 'text-primary' : 'text-foreground'}`}>
                  Customer
                </p>
              </button>
              <button
                onClick={() => setRoleMode('admin')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  roleMode === 'admin'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <ShieldCheck className={`mx-auto mb-2 ${roleMode === 'admin' ? 'text-primary' : 'text-muted-foreground'}`} size={24} />
                <p className={`font-medium ${roleMode === 'admin' ? 'text-primary' : 'text-foreground'}`}>
                  Admin
                </p>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  id="email"
                  type="email"
                  placeholder={roleMode === 'admin' ? 'admin@cleandrop.com' : 'you@example.com'}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {mode === 'login' && roleMode === 'admin' && (
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                Demo: Use <strong>admin@cleandrop.com</strong> with any password
              </p>
            )}

            <Button type="submit" className="w-full py-6 text-lg" disabled={isLoading}>
              {isLoading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-primary font-medium hover:underline"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Auth;
