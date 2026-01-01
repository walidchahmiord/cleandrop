import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHomePage = location.pathname === '/';
  const headerBg = isScrolled || !isHomePage
    ? 'bg-background/95 backdrop-blur-lg shadow-soft'
    : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo variant={isScrolled || !isHomePage ? 'default' : 'light'} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link text-sm font-medium tracking-wide uppercase ${
                  isScrolled || !isHomePage ? 'text-foreground/80' : 'text-primary-foreground/90'
                } ${location.pathname === link.path ? 'font-semibold' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              to="/cart"
              className={`relative p-2 rounded-full transition-colors ${
                isScrolled || !isHomePage
                  ? 'hover:bg-primary/10 text-foreground'
                  : 'hover:bg-white/10 text-primary-foreground'
              }`}
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to={user?.role === 'admin' ? '/admin' : '/profile'}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    isScrolled || !isHomePage ? 'text-foreground' : 'text-primary-foreground'
                  }`}
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full border-2 border-accent"
                  />
                  <span className="hidden xl:inline">{user?.name}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className={isScrolled || !isHomePage ? '' : 'text-primary-foreground hover:bg-white/10'}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button
                  variant={isScrolled || !isHomePage ? 'default' : 'secondary'}
                  size="sm"
                  className="hidden md:flex"
                >
                  <User size={18} className="mr-2" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                isScrolled || !isHomePage ? 'text-foreground' : 'text-primary-foreground'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-medium py-2 ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground/70'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-border my-2" />
              {isAuthenticated ? (
                <>
                  <Link
                    to={user?.role === 'admin' ? '/admin' : '/profile'}
                    className="flex items-center gap-3 py-2"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full border-2 border-accent"
                    />
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </Link>
                  <Button onClick={logout} variant="outline" className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth" className="w-full">
                  <Button className="w-full">Sign In</Button>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
