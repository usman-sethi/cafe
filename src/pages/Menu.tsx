import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { FEATURED_MENU } from '@/data';
import { SEO } from '@/components/SEO';

const CATEGORIES = ['All', 'Coffee', 'Espresso', 'Latte', 'Cold Brew', 'Tea', 'Breakfast', 'Lunch', 'Desserts', 'Seasonal'];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Duplicating some data to make the menu look fuller for the demo
  const fullMenu = [
    ...FEATURED_MENU.map(i => ({ ...i, calories: Math.floor(Math.random() * 300) + 50 })),
    { id: 'm7', name: 'Cappuccino', description: 'Equal parts espresso, steamed milk, and foam.', price: '$4.50', category: 'Espresso', calories: 120, image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80' },
    { id: 'm8', name: 'Cortado', description: 'Espresso cut with a small amount of warm milk to reduce acidity.', price: '$4.00', category: 'Espresso', calories: 80, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' },
    { id: 'm9', name: 'Avocado Toast', description: 'Smashed avocado, cherry tomatoes, radish, and microgreens on sourdough.', price: '$9.50', category: 'Breakfast', calories: 350, image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=800&q=80', popular: true },
    { id: 'm10', name: 'Earl Grey Tea', description: 'Classic black tea infused with bergamot orange.', price: '$3.50', category: 'Tea', calories: 2, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80' },
    { id: 'm11', name: 'Vanilla Bean Scone', description: 'Tender crumb scone glazed with real vanilla bean icing.', price: '$3.50', category: 'Desserts', calories: 420, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
    { id: 'm12', name: 'Nitro Cold Brew', description: 'Cold brew infused with nitrogen for a creamy, stout-like effect.', price: '$6.00', category: 'Cold Brew', calories: 15, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80' },
    { id: 'm13', name: 'Roasted Turkey Panini', description: 'Sliced turkey breast, provolone, pesto, and spinach on artisan ciabatta.', price: '$11.50', category: 'Lunch', calories: 520, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' },
    { id: 'm14', name: 'Pumpkin Spice Latte', description: 'Our signature espresso and steamed milk with pumpkin, cinnamon, nutmeg, and clove.', price: '$5.50', category: 'Seasonal', calories: 380, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', popular: true }
  ];

  const filteredMenu = useMemo(() => {
    return fullMenu.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, fullMenu]);

  return (
    <>
      <SEO 
        title="Menu" 
        description="Carefully crafted beverages and fresh seasonal fare at Luna Café." 
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Menu",
          "name": "Luna Café Menu",
          "hasMenuSection": [
            {
              "@type": "MenuSection",
              "name": "Featured Menu",
              "hasMenuItem": FEATURED_MENU.map(item => ({
                "@type": "MenuItem",
                "name": item.name,
                "description": item.description,
                "offers": {
                  "@type": "Offer",
                  "price": item.price.replace('$', ''),
                  "priceCurrency": "USD"
                }
              }))
            }
          ]
        }}
      />
      <main className="min-h-screen pt-28 pb-24 bg-cream">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif text-coffee-950 mb-6">Our Menu</h1>
            <p className="text-coffee-700 max-w-2xl mx-auto text-lg">
              Carefully crafted beverages and fresh seasonal fare.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            {/* Categories Filter */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2" role="tablist">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  role="tab"
                  aria-selected={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-3 rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                    activeCategory === category 
                      ? 'bg-coffee-950 text-coffee-50 shadow-lg' 
                      : 'bg-transparent text-coffee-950 hover:bg-coffee-100 border border-coffee-950/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-coffee-700" />
              </div>
              <input
                type="text"
                value={searchQuery}
                aria-label="Search menu"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu..."
                className="w-full bg-white border border-coffee-200 text-coffee-900 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
              />
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex bg-white rounded-2xl overflow-hidden shadow-sm border border-coffee-100/50 hover:shadow-md transition-shadow group"
                >
                  <div className="w-1/3 shrink-0 relative overflow-hidden">
                    <img referrerPolicy="no-referrer" src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col justify-center flex-grow">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="text-xl font-serif font-semibold text-coffee-900">{item.name}</h3>
                      <span className="text-lg font-medium text-coffee-700 shrink-0">{item.price}</span>
                    </div>
                    <p className="text-coffee-700 text-sm leading-relaxed mb-3">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-auto">
                      {item.popular && (
                        <span className="bg-gold/20 text-coffee-900 text-xs font-bold px-2 py-1 rounded">Popular</span>
                      )}
                      <span className="bg-coffee-100 text-coffee-800 text-xs font-medium px-2 py-1 rounded">{item.category}</span>
                      {item.calories && (
                         <span className="text-xs text-coffee-700 ml-auto">{item.calories} cal</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-1 lg:col-span-2 text-center py-20">
                <p className="text-coffee-700 text-lg">No items found matching your search.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-4 text-gold hover:underline font-medium"
                >
                  Clear search and filters
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </>
  );
}
