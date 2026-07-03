import { SEO } from '@/components/SEO';
import { motion } from 'motion/react';
import { Coffee, Heart, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn about the history, mission, and craftsmanship behind Luna Café." 
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Luna Café",
          "description": "Founded on a passion for exceptional coffee and genuine connections, Luna Café is a sanctuary for the community.",
          "url": "https://lunacafe.com/about"
        }}
      />
      <main className="min-h-screen pt-28 pb-24 bg-cream">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif text-coffee-950 mb-6">Our Story</h1>
            <p className="text-coffee-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Founded on a passion for exceptional coffee and genuine connections, Luna Café is more than just a coffee shop. It's a sanctuary for the community.
            </p>
          </div>

          {/* History & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-coffee-900">A Journey of Flavor</h2>
              <p className="text-coffee-700 leading-relaxed">
                Our journey began in 2015 when our founder, driven by a deep-seated love for artisanal roasting, set out to create a space that celebrates the true essence of coffee. What started as a modest roastery has grown into a beloved local institution, yet our core values remain unchanged.
              </p>
              <p className="text-coffee-700 leading-relaxed">
                We believe that every cup tells a story. From the high-altitude farms where our beans are hand-picked, to the careful roasting process that unlocks their unique profiles, we are dedicated to honoring the craft at every step.
              </p>
              <div className="pt-4 flex gap-8">
                <div className="text-center">
                  <span className="block text-4xl font-serif text-gold mb-2">10+</span>
                  <span className="text-xs uppercase tracking-widest text-coffee-600">Years of Craft</span>
                </div>
                <div className="text-center">
                  <span className="block text-4xl font-serif text-gold mb-2">15</span>
                  <span className="text-xs uppercase tracking-widest text-coffee-600">Direct Trade Farms</span>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <img referrerPolicy="no-referrer" 
                src="/images/img_e8158be7.jpg" 
                alt="Coffee beans roasting" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="bg-white p-8 rounded-2xl shadow-sm border border-coffee-100/50 text-center">
              <div className="w-16 h-16 mx-auto bg-coffee-50 rounded-full flex items-center justify-center mb-6 text-gold">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-coffee-900 mb-3">Craftsmanship</h3>
              <p className="text-coffee-600 text-sm">Every shot is pulled with precision, ensuring the perfect balance of crema, body, and heart.</p>
            </motion.div>

            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.1}} className="bg-white p-8 rounded-2xl shadow-sm border border-coffee-100/50 text-center">
              <div className="w-16 h-16 mx-auto bg-coffee-50 rounded-full flex items-center justify-center mb-6 text-gold">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-coffee-900 mb-3">Passion</h3>
              <p className="text-coffee-600 text-sm">We don't just serve coffee; we share our love for the bean and the culture surrounding it.</p>
            </motion.div>

            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.2}} className="bg-white p-8 rounded-2xl shadow-sm border border-coffee-100/50 text-center">
              <div className="w-16 h-16 mx-auto bg-coffee-50 rounded-full flex items-center justify-center mb-6 text-gold">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-coffee-900 mb-3">Community</h3>
              <p className="text-coffee-600 text-sm">Creating a welcoming, inclusive space where neighbors gather, work, and connect.</p>
            </motion.div>

            <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.3}} className="bg-white p-8 rounded-2xl shadow-sm border border-coffee-100/50 text-center">
              <div className="w-16 h-16 mx-auto bg-coffee-50 rounded-full flex items-center justify-center mb-6 text-gold">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-coffee-900 mb-3">Quality</h3>
              <p className="text-coffee-600 text-sm">From organic milk options to locally sourced pastries, we never compromise on ingredients.</p>
            </motion.div>
          </div>

          {/* Sourcing & Sustainability */}
          <div className="mb-24 bg-coffee-950 text-coffee-50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">Sustainability</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Ethical Sourcing, Brighter Futures</h2>
                <p className="text-coffee-200 leading-relaxed mb-6">
                  We believe that great coffee shouldn't come at the expense of our planet or the people who cultivate it. Our direct-trade model ensures that farmers receive fair compensation above market rates, empowering them to invest in sustainable farming practices and their local communities.
                </p>
                <p className="text-coffee-200 leading-relaxed">
                  From zero-waste packaging initiatives in our café to supporting rainforest conservation projects at origin, every cup you enjoy contributes to a more sustainable future for coffee.
                </p>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img referrerPolicy="no-referrer" 
                  src="/images/img_128ac12e.jpg" 
                  alt="Coffee farmer in the field" 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Meet the Team */}
          <div className="mb-24 text-center">
             <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our People</span>
             <h2 className="text-4xl font-serif text-coffee-950 mb-12">Meet the Artisans</h2>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { name: "Elena Rossi", role: "Head Roaster", image: "/images/img_b30d2a10.jpg" },
                 { name: "David Chen", role: "Lead Barista", image: "/images/img_b057ee93.jpg" },
                 { name: "Sarah Jenkins", role: "Pastry Chef", image: "/images/img_cc2e6de5.jpg" },
                 { name: "Marcus Thorne", role: "Coffee Buyer", image: "/images/img_00e8191a.jpg" }
               ].map((member, i) => (
                 <div key={i} className="group">
                   <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                     <img referrerPolicy="no-referrer" 
                       src={member.image} 
                       alt={member.name} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                       loading="lazy"
                     />
                   </div>
                   <h3 className="text-xl font-serif text-coffee-950 mb-1">{member.name}</h3>
                   <span className="text-coffee-600 text-sm">{member.role}</span>
                 </div>
               ))}
             </div>
          </div>

          {/* Lifestyle Imagery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img referrerPolicy="no-referrer" src="/images/img_7354bac2.jpg" alt="Lifestyle 1" className="w-full h-64 object-cover rounded-xl" loading="lazy" />
            <img referrerPolicy="no-referrer" src="/images/img_e5bf5a4d.jpg" alt="Lifestyle 2" className="w-full h-64 object-cover rounded-xl mt-8" loading="lazy" />
            <img referrerPolicy="no-referrer" src="/images/img_eaad4bbc.jpg" alt="Lifestyle 3" className="w-full h-64 object-cover rounded-xl" loading="lazy" />
            <img referrerPolicy="no-referrer" src="/images/img_38f84fe4.jpg" alt="Lifestyle 4" className="w-full h-64 object-cover rounded-xl mt-8" loading="lazy" />
          </div>

        </div>
      </main>
    </>
  );
}
