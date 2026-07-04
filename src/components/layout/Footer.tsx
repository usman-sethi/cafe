import { Coffee, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-coffee-950 text-coffee-50 pt-16 pb-8" role="contentinfo">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group" aria-label="Luna Café Home">
              <Coffee className="h-8 w-8 text-gold" />
              <div className="flex flex-col">
                <span className="font-serif text-3xl italic font-light tracking-tighter text-coffee-50">
                  Luna Café
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-gold mt-0.5">Artisan House</span>
              </div>
            </Link>
            <p className="text-coffee-200 text-sm leading-relaxed max-w-xs">
              A premium coffee house dedicated to the art of coffee. We source the finest beans globally and roast them with passion locally.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-coffee-200 hover:text-gold transition-colors" aria-label="Luna Café on Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-coffee-200 hover:text-gold transition-colors" aria-label="Luna Café on Twitter"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-coffee-200 hover:text-gold transition-colors" aria-label="Luna Café on Facebook"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              {['Our Story', 'Menu', 'Reservations', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-coffee-200 hover:text-white transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-gold">Visit Us</h3>
            <ul className="space-y-4 text-coffee-200 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold shrink-0" />
                <span>123 Artisan Ave, Coffee District<br />Seattle, WA 98101</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <span>hello@lunacafe.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-lg font-medium mb-6 text-gold">Opening Hours</h3>
            <ul className="space-y-3 text-coffee-200 text-sm">
              <li className="flex justify-between border-b border-coffee-800 pb-2">
                <span>Mon - Fri</span>
                <span>7:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-coffee-800 pb-2">
                <span>Saturday</span>
                <span>8:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-coffee-800 pb-2">
                <span>Sunday</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-coffee-900 text-center text-sm text-coffee-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Luna Café. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-coffee-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-coffee-200 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
