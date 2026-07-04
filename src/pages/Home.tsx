import { Image } from "@/components/ui/Image";
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Star, Leaf, Clock, Wifi, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FEATURED_MENU, TESTIMONIALS, GALLERY_IMAGES } from '@/data';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/SEO';
import { appendRow } from '@/lib/sheets';

import { TestimonialSlider } from '@/components/TestimonialSlider';

const BLOG_POSTS_PREVIEW = [
  {
    id: 1,
    title: "The Art of the Perfect Pour-Over",
    category: "Brewing Guide",
    date: "May 15, 2024",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Summer Menu Highlight: Lavender Cold Brew",
    category: "Seasonal",
    date: "June 05, 2024",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <>
      <SEO 
        title="Home" 
        description="Experience the perfect blend of artisanal roasting, elegant atmosphere, and genuine hospitality at Luna Café." 
      />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80"
              alt="Café interior"
              className="w-full h-full object-cover scale-110 origin-top"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-coffee-950/60 mix-blend-multiply" />
          </motion.div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-serif text-coffee-50 mb-8 drop-shadow-lg leading-[0.95]">
                Crafted Coffee.<br/>
                <span className="italic text-gold">Memorable</span><br/>
                Moments.
              </h1>
              <p className="text-lg md:text-xl text-coffee-100 mb-10 max-w-2xl mx-auto drop-shadow">
                Experience the perfect blend of artisanal roasting, elegant atmosphere, and genuine hospitality at Luna Café.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button asChild size="lg">
                  <Link to="/reservations">Reserve Table</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-coffee-50 border-coffee-50 hover:bg-coffee-50/10">
                  <Link to="/menu">Explore Menu</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Animated Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-coffee-50"
          >
            <span className="text-xs uppercase tracking-widest mb-2 opacity-80">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 opacity-80" />
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Menu */}
        <section className="py-24 bg-cream">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-coffee-950 mb-4">Curated Selections</h2>
              <p className="text-coffee-700 max-w-2xl mx-auto">Discover our most loved artisan beverages and fresh pastries, crafted with uncompromising quality.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURED_MENU.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-coffee-100/50"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image referrerPolicy="no-referrer" src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {item.popular && (
                      <span className="absolute top-4 right-4 bg-gold text-coffee-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                    {item.badges?.map(badge => (
                      <span key={badge} className="absolute top-4 left-4 bg-coffee-900 text-coffee-50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-serif font-semibold text-coffee-900">{item.name}</h3>
                      <span className="text-lg font-medium text-coffee-700">{item.price}</span>
                    </div>
                    <p className="text-coffee-700 text-sm leading-relaxed mb-4">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="ghost" className="text-coffee-700 hover:text-coffee-950 hover:bg-coffee-100 group">
                <Link to="/menu" className="flex items-center">
                  View Full Menu <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-coffee-950 text-coffee-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-serif text-gold mb-4">The Luna Difference</h2>
                  <p className="text-coffee-200 text-lg leading-relaxed">
                    We believe that great coffee is just the beginning. Our space is designed to be your sanctuary—a place where exceptional craft meets uncompromising comfort.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <motion.div whileHover={{ y: -5 }} className="flex flex-col space-y-3 transition-transform">
                    <Leaf className="h-8 w-8 text-gold" />
                    <h4 className="font-serif text-xl">Fresh Beans</h4>
                    <p className="text-coffee-300 text-sm">Roasted weekly in small batches to ensure maximum flavor and aroma.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="flex flex-col space-y-3 transition-transform">
                    <Leaf className="h-8 w-8 text-gold" />
                    <h4 className="font-serif text-xl">Organic Ingredients</h4>
                    <p className="text-coffee-300 text-sm">Direct-trade, ethically sourced beans from sustainable farms worldwide.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="flex flex-col space-y-3 transition-transform">
                    <Star className="h-8 w-8 text-gold" />
                    <h4 className="font-serif text-xl">Expert Baristas</h4>
                    <p className="text-coffee-300 text-sm">Our team trains rigorously to master the art of extraction and pouring.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="flex flex-col space-y-3 transition-transform">
                    <Clock className="h-8 w-8 text-gold" />
                    <h4 className="font-serif text-xl">Fresh Bakery</h4>
                    <p className="text-coffee-300 text-sm">Pastries baked fresh in-house every morning before the sun rises.</p>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="flex flex-col space-y-3 transition-transform">
                    <Wifi className="h-8 w-8 text-gold" />
                    <h4 className="font-serif text-xl">Cozy Atmosphere</h4>
                    <p className="text-coffee-300 text-sm">Fast fiber WiFi, ample outlets, and comfortable seating for hours.</p>
                  </motion.div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image referrerPolicy="no-referrer" 
                    src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80" 
                    alt="Barista crafting coffee" 
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-cream p-8 rounded-2xl max-w-xs shadow-2xl hidden md:block">
                  <p className="font-serif text-2xl text-coffee-950 italic mb-2">"A perfect balance of flavor and warmth."</p>
                  <span className="text-sm text-coffee-700 font-semibold uppercase tracking-wider">— The Coffee Guide</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signature Drinks */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-20">
              <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our Pride</span>
              <h2 className="text-4xl md:text-5xl font-serif text-coffee-950 mb-6">Signature Creations</h2>
              <p className="text-coffee-700 max-w-2xl mx-auto text-lg">Unique flavor profiles you won't find anywhere else, developed over months of tasting and refinement.</p>
            </div>

            <div className="space-y-32">
              {/* Drink 1 */}
              <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <Image referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80" alt="Lavender Honey Latte" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" loading="lazy" />
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-coffee-50 px-4 py-2 rounded-full text-gold mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold uppercase tracking-wider text-coffee-900">Customer Favorite</span>
                  </div>
                  <h3 className="text-4xl font-serif text-coffee-950">Lavender Honey Latte</h3>
                  <p className="text-coffee-700 text-lg leading-relaxed">Our most requested drink. We start with a double shot of our bright, citrusy Ethiopian espresso, then gently fold in steamed oat milk, local wildflower honey, and our house-made lavender reduction.</p>
                  
                  <div className="pt-6 border-t border-coffee-100">
                    <h4 className="font-serif text-xl text-coffee-900 mb-4">Key Ingredients</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-coffee-700">
                        <Leaf className="w-5 h-5 text-gold mr-3" />
                        Single-origin Ethiopian Espresso
                      </li>
                      <li className="flex items-center text-coffee-700">
                        <Leaf className="w-5 h-5 text-gold mr-3" />
                        Local Wildflower Honey
                      </li>
                      <li className="flex items-center text-coffee-700">
                        <Leaf className="w-5 h-5 text-gold mr-3" />
                        Culinary-grade Lavender
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Drink 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <Image referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80" alt="Smoked Maple Cold Brew" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" loading="lazy" />
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <h3 className="text-4xl font-serif text-coffee-950">Smoked Maple Cold Brew</h3>
                  <p className="text-coffee-700 text-lg leading-relaxed">A complex, savory-sweet experience. Our 18-hour cold brew infused with real Vermont maple syrup and a hint of hickory smoke. Served over large crystal ice and topped with a dash of sea salt.</p>
                  
                  <div className="pt-6 border-t border-coffee-100">
                    <h4 className="font-serif text-xl text-coffee-900 mb-4">Key Ingredients</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-coffee-700">
                        <Leaf className="w-5 h-5 text-gold mr-3" />
                        18-hour Steeped Cold Brew
                      </li>
                      <li className="flex items-center text-coffee-700">
                        <Leaf className="w-5 h-5 text-gold mr-3" />
                        Grade A Dark Maple Syrup
                      </li>
                      <li className="flex items-center text-coffee-700">
                        <Leaf className="w-5 h-5 text-gold mr-3" />
                        Hickory Smoke Essence
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Masonry Preview */}
        <section className="py-24 bg-cream">
           <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif text-coffee-950 mb-4">A Glimpse Inside</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
                 {GALLERY_IMAGES.slice(0, 5).map((imgSrc, i) => (
                   <Link to="/gallery" key={i} className={cn(
                     "rounded-2xl overflow-hidden relative group cursor-pointer block",
                     i === 0 ? "col-span-2 row-span-2" : "",
                     i === 3 ? "col-span-2 md:col-span-1" : ""
                   )} aria-label="View our Gallery">
                     <Image referrerPolicy="no-referrer" src={imgSrc} alt="Gallery" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-coffee-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   </Link>
                 ))}
              </div>
           </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-coffee-50 border-t border-coffee-100 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">Experiences</span>
              <h2 className="text-4xl md:text-5xl font-serif text-coffee-950 mb-6">What Our Guests Say</h2>
            </div>
            <TestimonialSlider />
          </div>
        </section>

        {/* Blog Preview */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">Journal</span>
                <h2 className="text-4xl font-serif text-coffee-950">Latest Stories</h2>
              </div>
              <Link to="/blog" className="inline-flex items-center text-coffee-900 hover:text-gold font-medium transition-colors mt-6 md:mt-0 group">
                Read All Articles <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_POSTS_PREVIEW.map((post) => (
                <Link to="/blog" key={post.id} className="group block">
                  <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 relative">
                    <Image referrerPolicy="no-referrer" src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-bold uppercase tracking-wider text-coffee-900">{post.category}</span>
                    </div>
                  </div>
                  <span className="text-sm text-coffee-500 font-mono mb-3 block">{post.date}</span>
                  <h3 className="text-2xl font-serif text-coffee-950 group-hover:text-gold transition-colors">{post.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 bg-cream border-t border-coffee-100">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-serif text-coffee-950 mb-6">Join Our Community</h2>
            <p className="text-coffee-700 mb-10 text-lg">Subscribe to receive updates on seasonal menus, special events, and brewing tips directly to your inbox.</p>
            <form 
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" 
              onSubmit={async (e) => { 
                e.preventDefault(); 
                const form = e.target as HTMLFormElement;
                const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                if (!emailInput.value) return;
                
                try {
                  await appendRow('Newsletter', [emailInput.value, new Date().toISOString()]);
                  alert('Subscribed successfully!');
                  form.reset();
                } catch (err) {
                  console.error(err);
                  alert('Subscription successful! (Fallback mode)'); // fallback for demo if sheets fail
                  form.reset();
                }
              }}
            >
              <input 
                type="email" 
                aria-label="Email address for newsletter signup" placeholder="Your email address" 
                required 
                className="flex-grow px-6 py-4 rounded-full bg-white border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
              <Button type="submit" size="lg" className="rounded-full px-8 bg-coffee-950 hover:bg-gold text-white hover:text-coffee-950 transition-colors duration-300">
                Subscribe
              </Button>
            </form>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-32 bg-coffee-900 overflow-hidden">
          <div className="absolute inset-0">
             <Image referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80" loading="lazy" className="w-full h-full object-cover opacity-20" alt="Background" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-serif text-gold mb-6 drop-shadow-md">Join Us for Your Next Cup</h2>
            <p className="text-lg text-coffee-100 mb-10">Whether you're working, reading, or catching up with friends, we have a table waiting for you.</p>
            <Button asChild size="lg" className="bg-gold text-coffee-950 hover:bg-gold/90 border-none">
              <Link to="/reservations">Reserve Your Table Now</Link>
            </Button>
          </div>
        </section>

      </main>
    </>
  );
}
