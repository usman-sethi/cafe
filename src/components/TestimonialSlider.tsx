import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/data';

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-12">
      <div className="relative h-[400px] md:h-[300px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <img referrerPolicy="no-referrer" 
              src={TESTIMONIALS[currentIndex].avatar} 
              alt={TESTIMONIALS[currentIndex].name} 
              loading="lazy" 
              className="w-24 h-24 rounded-full object-cover mb-8 ring-4 ring-gold/20" 
            />
            <div className="flex space-x-1 text-gold mb-6" aria-label={`Rating: ${TESTIMONIALS[currentIndex].rating} out of 5 stars`}>
              {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <p className="text-coffee-700 italic mb-8 text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
              "{TESTIMONIALS[currentIndex].quote}"
            </p>
            <span className="font-serif font-medium text-coffee-950 text-xl tracking-wide uppercase">
              {TESTIMONIALS[currentIndex].name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md text-coffee-600 hover:text-gold hover:scale-110 transition-all z-10"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-md text-coffee-600 hover:text-gold hover:scale-110 transition-all z-10"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      <div className="flex justify-center space-x-3 mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-gold w-8' : 'bg-coffee-200 hover:bg-gold/50'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
