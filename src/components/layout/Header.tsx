import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [renderMobileMenu, setRenderMobileMenu] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setRenderMobileMenu(true);
    } else if (renderMobileMenu && menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          setRenderMobileMenu(false);
        }
      });
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (renderMobileMenu && isMobileMenuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.5, ease: 'power3.out' }
      );
      
      const items = menuRef.current.querySelectorAll('.mobile-nav-item');
      gsap.fromTo(
        items,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, [renderMobileMenu, isMobileMenuOpen]);

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

  const isTransparent = !isScrolled && location.pathname === '/' && !isMobileMenuOpen;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          !isTransparent
            ? 'bg-cream/90 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        )}
        role="banner"
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-50">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group" aria-label="Luna Café Home">
              <Coffee className={cn("h-8 w-8 transition-colors duration-300", 
                 isTransparent ? 'text-coffee-50' : 'text-coffee-900')} />
              <div className="flex flex-col">
                <span className={cn("font-serif text-3xl italic font-light tracking-tighter transition-colors duration-300", 
                   isTransparent ? 'text-coffee-50' : 'text-coffee-900')}>
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
                    isTransparent ? 'text-coffee-50/80 hover:text-coffee-50' : 'text-coffee-900/60',
                    location.pathname === link.path && (isTransparent ? 'text-coffee-50' : 'text-coffee-900 font-bold')
                  )}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild variant={isTransparent ? 'secondary' : 'default'} className="rounded-full">
                <Link to="/reservations">Book a Table</Link>
              </Button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 -mr-2 relative z-[60]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className={cn("h-6 w-6", isTransparent ? 'text-coffee-50' : 'text-coffee-900')} />
              ) : (
                <Menu className={cn("h-6 w-6", isTransparent ? 'text-coffee-50' : 'text-coffee-900')} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {renderMobileMenu && (
        <div
          ref={menuRef}
          className="fixed inset-0 top-0 pt-24 bg-cream z-40 md:hidden overflow-y-auto" role="dialog" aria-modal="true"
        >
          <nav className="flex flex-col px-6 py-8" aria-label="Mobile Navigation">
            {navLinks.map((link, index) => (
              <div key={link.name} className="mobile-nav-item">
                <Link
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block py-4 text-3xl font-serif border-b border-coffee-200/50 relative overflow-hidden group",
                    location.pathname === link.path ? 'text-gold' : 'text-coffee-900'
                  )}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  <span className="relative z-10 group-hover:pl-4 transition-all duration-300 flex items-center">
                    {link.name}
                    <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2" />
                  </span>
                  <div className="absolute inset-0 bg-coffee-50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </Link>
              </div>
            ))}
            <div className="mobile-nav-item mt-12">
              <Button asChild className="w-full h-14 text-lg rounded-full" size="lg">
                <Link to="/reservations" onClick={() => setIsMobileMenuOpen(false)}>Book a Table</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
