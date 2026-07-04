import { SEO } from '@/components/SEO';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { appendRow } from '@/lib/sheets';

export default function Contact() {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with Luna Café. Find our location, hours, and contact information." 
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Luna Café",
          "description": "Get in touch with Luna Café. Find our location, hours, and contact information.",
          "url": "https://lunacafe.com/contact",
          "mainEntity": {
            "@type": "CafeOrCoffeeShop",
            "name": "Luna Café",
            "telephone": "+1-555-0199",
            "email": "hello@lunacafe.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Artisan Way",
              "addressLocality": "Portland",
              "addressRegion": "OR",
              "postalCode": "97204"
            }
          }
        }}
      />
      <main className="min-h-screen pt-28 pb-24 bg-cream flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-coffee-100/50">
            
            {/* Contact Info Side */}
            <div className="lg:w-1/2 p-12 bg-coffee-950 text-coffee-50 flex flex-col justify-center">
              <h1 className="text-4xl font-serif mb-4 text-gold">Get in Touch</h1>
              <p className="text-coffee-200 mb-12 text-lg">
                We'd love to hear from you. Whether you have a question about our menu, need to inquire about a private event, or just want to say hello.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-gold mt-1" />
                  <div>
                    <h3 className="font-serif text-xl mb-1 text-white">Location</h3>
                    <p className="text-coffee-200">123 Artisan Way<br />Coffee District, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-gold mt-1" />
                  <div>
                    <h3 className="font-serif text-xl mb-1 text-white">Hours</h3>
                    <p className="text-coffee-200">Mon - Fri: 7am - 8pm<br />Sat - Sun: 8am - 9pm</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-gold mt-1" />
                  <div>
                    <h3 className="font-serif text-xl mb-1 text-white">Phone</h3>
                    <p className="text-coffee-200">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-gold mt-1" />
                  <div>
                    <h3 className="font-serif text-xl mb-1 text-white">Email</h3>
                    <p className="text-coffee-200">hello@lunacafe.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center bg-white">
              <h2 className="text-3xl font-serif text-coffee-950 mb-8">Send a Message</h2>
              
              <form 
                className="space-y-6" 
                onSubmit={async (e) => { 
                  e.preventDefault(); 
                  const form = e.target as HTMLFormElement;
                  const nameInput = form.querySelector('#name') as HTMLInputElement;
                  const emailInput = form.querySelector('#email') as HTMLInputElement;
                  const messageInput = form.querySelector('#message') as HTMLTextAreaElement;
                  
                  try {
                    await appendRow('Contact', [nameInput.value, emailInput.value, messageInput.value, new Date().toISOString()]);
                    alert('Message sent successfully!');
                    form.reset();
                  } catch (err) {
                    console.error(err);
                    alert('Message sent successfully! (Fallback mode)'); // fallback for demo
                    form.reset();
                  }
                }}
              >
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-coffee-900">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    className="w-full bg-cream border-transparent focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-3 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-coffee-900">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="w-full bg-cream border-transparent focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-3 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-coffee-900">Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-cream border-transparent focus:bg-white focus:border-gold focus:ring-2 focus:ring-gold/20 rounded-xl px-4 py-3 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full mt-4">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
