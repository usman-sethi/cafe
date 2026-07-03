import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { GALLERY_IMAGES } from '@/data';

const GALLERY_CATEGORIES = ['All', 'Interior', 'Coffee', 'Food'];

// We map our GALLERY_IMAGES to include categories for filtering demonstration
const GALLERY_ITEMS = GALLERY_IMAGES.map((img, idx) => ({
  id: idx,
  category: GALLERY_CATEGORIES[(idx % (GALLERY_CATEGORIES.length - 1)) + 1],
  image: img
}));

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <>
      <SEO 
        title="Gallery" 
        description="Explore the beautiful interior and artisanal creations at Luna Café." 
      />
      <main className="min-h-screen pt-28 pb-24 bg-cream">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif text-coffee-950 mb-6">Our Gallery</h1>
            <p className="text-coffee-600 max-w-2xl mx-auto text-lg">
              A visual journey through our crafted spaces and signature offerings.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist">
            {GALLERY_CATEGORIES.map(category => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-coffee-950 text-coffee-50 shadow-lg' 
                    : 'bg-transparent text-coffee-950 hover:bg-coffee-100 border border-coffee-950/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => setSelectedImage(item.image)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.category} image fullscreen`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedImage(item.image);
                    }
                  }}
                >
                  <img referrerPolicy="no-referrer" 
                    src={item.image} 
                    alt={`Gallery ${item.category}`} 
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-coffee-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <span className="text-white text-sm font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">View</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-coffee-950/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gold transition-colors p-2"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Fullscreen preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
