import { SEO } from '@/components/SEO';
import { TESTIMONIALS } from '@/data';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <>
      <SEO 
        title="Testimonials" 
        description="Read what our guests have to say about their experience at Luna Café." 
      />
      <main className="min-h-screen pt-28 pb-24 bg-coffee-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif text-coffee-950 mb-6">Guest Experiences</h1>
            <p className="text-coffee-700 max-w-2xl mx-auto text-lg">
              We take pride in creating memorable moments for every guest who walks through our doors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100/50 flex flex-col items-center text-center">
                <img referrerPolicy="no-referrer" src={t.avatar} alt={t.name} loading="lazy" className="w-20 h-20 rounded-full object-cover mb-6 ring-4 ring-coffee-50" />
                <div className="flex space-x-1 text-gold mb-6" aria-label={`Rating: ${t.rating} out of 5 stars`}>
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-coffee-700 italic mb-8 leading-relaxed">"{t.quote}"</p>
                <div className="mt-auto">
                  <span className="block font-serif font-medium text-coffee-950 text-lg">{t.name}</span>
                  <span className="text-sm text-coffee-500">Local Guide</span>
                </div>
              </div>
            ))}
            
            {/* Adding some more hardcoded testimonials to fill out the page */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100/50 flex flex-col items-center text-center">
              <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80" alt="Alex Rivera" loading="lazy" className="w-20 h-20 rounded-full object-cover mb-6 ring-4 ring-coffee-50" />
              <div className="flex space-x-1 text-gold mb-6" aria-label="Rating: 5 out of 5 stars">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-coffee-700 italic mb-8 leading-relaxed">"The pour-over is absolutely incredible. It's rare to find a place that pays this much attention to the subtle notes of single-origin beans."</p>
              <div className="mt-auto">
                <span className="block font-serif font-medium text-coffee-950 text-lg">Alex Rivera</span>
                <span className="text-sm text-coffee-500">Coffee Enthusiast</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100/50 flex flex-col items-center text-center">
              <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1463797221720-6b07e6426c24?auto=format&fit=crop&w=800&q=80" alt="Emily Chen" loading="lazy" className="w-20 h-20 rounded-full object-cover mb-6 ring-4 ring-coffee-50" />
              <div className="flex space-x-1 text-gold mb-6" aria-label="Rating: 5 out of 5 stars">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-coffee-700 italic mb-8 leading-relaxed">"My favorite study spot. The ambiance is perfect, the Wi-Fi is reliable, and the matcha latte is the best I've had in the city."</p>
              <div className="mt-auto">
                <span className="block font-serif font-medium text-coffee-950 text-lg">Emily Chen</span>
                <span className="text-sm text-coffee-500">Student</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100/50 flex flex-col items-center text-center">
              <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80" alt="Marcus Johnson" loading="lazy" className="w-20 h-20 rounded-full object-cover mb-6 ring-4 ring-coffee-50" />
              <div className="flex space-x-1 text-gold mb-6" aria-label="Rating: 5 out of 5 stars">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-coffee-700 italic mb-8 leading-relaxed">"The almond croissants are life-changing. Always perfectly flaky and paired perfectly with their house blend cortado."</p>
              <div className="mt-auto">
                <span className="block font-serif font-medium text-coffee-950 text-lg">Marcus Johnson</span>
                <span className="text-sm text-coffee-500">Regular</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
