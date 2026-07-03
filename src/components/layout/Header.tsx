import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || location.pathname !== '/'
          ? 'bg-cream/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      )}
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group" aria-label="Luna Café Home">
            <Coffee className={cn("h-8 w-8 transition-colors duration-300", 
              !isScrolled && location.pathname === '/' ? 'text-coffee-50' : 'text-coffee-900')} />
            <div className="flex flex-col">
              <span className={cn("font-serif text-3xl italic font-light tracking-tighter transition-colors duration-300", 
                !isScrolled && location.pathname === '/' ? 'text-coffee-50' : 'text-coffee-900')}>
                Luna Café
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-gold mt-0.5">Artisan House</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors hover:text-gold",
                  !isScrolled && location.pathname === '/' ? 'text-coffee-50/80 hover:text-coffee-50' : 'text-coffee-900/60',
                  location.pathname === link.path && (!isScrolled && location.pathname === '/' ? 'text-coffee-50' : 'text-coffee-900 font-bold')
                )}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild variant={!isScrolled && location.pathname === '/' ? 'secondary' : 'default'} className="rounded-full">
              <Link to="/reservations">Book a Table</Link>
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className={cn("h-6 w-6", !isScrolled && location.pathname === '/' ? 'text-coffee-50' : 'text-coffee-900')} />
            ) : (
              <Menu className={cn("h-6 w-6", !isScrolled && location.pathname === '/' ? 'text-coffee-50' : 'text-coffee-900')} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[72px] bg-cream z-40 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col px-6 py-8" aria-label="Mobile Navigation">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block py-4 text-3xl font-serif border-b border-coffee-200/50",
                      location.pathname === link.path ? 'text-gold' : 'text-coffee-900'
                    )}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="mt-12"
              >
                <Button asChild className="w-full h-14 text-lg rounded-full" size="lg">
                  <Link to="/reservations" onClick={() => setIsMobileMenuOpen(false)}>Book a Table</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
