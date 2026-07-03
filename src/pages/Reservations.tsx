import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { appendRow } from '@/lib/sheets';
import { SEO } from '@/components/SEO';

const reservationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  date: z.string().min(1, { message: "Please select a date." }),
  time: z.string().min(1, { message: "Please select a time." }),
  guests: z.string().min(1, { message: "Please select number of guests." }),
  requests: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

export default function Reservations() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormValues) => {
    try {
      const row = [
        data.date,
        data.time,
        data.name,
        data.email,
        data.phone,
        data.guests,
        data.requests || '',
        new Date().toISOString()
      ];
      
      await appendRow('Reservations', row);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit reservation:", error);
      alert("Failed to submit reservation. Please make sure the site administrator has configured Google Sheets.");
    }
  };

  return (
    <>
      <SEO 
        title="Reservations" 
        description="Book your table at Luna Café. We look forward to serving you." 
      />
      <main className="min-h-screen pt-28 pb-24 bg-cream flex items-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
            
            {/* Image Side */}
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
              <img referrerPolicy="no-referrer" 
                src="/images/img_6ba0ff72.jpg" 
                alt="Café table" 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-coffee-950/40 mix-blend-multiply" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                <h2 className="text-4xl font-serif mb-4">Save Your Seat</h2>
                <p className="text-lg text-coffee-100 max-w-md">
                  Ensure a spot for your perfect morning coffee, weekend brunch, or quiet afternoon study session.
                </p>
              </div>
            </div>

          {/* Form Side */}
          <div className="lg:w-1/2 p-8 md:p-16">
            {!isSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="text-3xl font-serif text-coffee-950 mb-4">Reservation Details</h3>
                
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-coffee-900">Full Name</label>
                      <input 
                        {...register('name')}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-coffee-900">Email Address</label>
                      <input 
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-coffee-900">Date</label>
                      <input 
                        type="date"
                        {...register('date')}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                      />
                      {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-coffee-900">Time</label>
                      <select 
                        {...register('time')}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                      >
                        <option value="">Select Time</option>
                        <option value="08:00">8:00 AM</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                      </select>
                      {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-coffee-900">Guests</label>
                      <select 
                        {...register('guests')}
                        className="w-full px-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                      >
                        <option value="">Select Guests</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5+">5+ People</option>
                      </select>
                      {errors.guests && <p className="text-red-500 text-xs">{errors.guests.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-coffee-900">Phone Number</label>
                    <input 
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-coffee-900">Special Requests (Optional)</label>
                    <textarea 
                      {...register('requests')}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none"
                      placeholder="Any allergies, seating preferences, etc."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full space-y-6 py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif text-coffee-950">Reservation Confirmed!</h3>
                <p className="text-coffee-600 max-w-sm">
                  Thank you for choosing Luna Café. We've sent a confirmation email with your reservation details.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mt-8 rounded-full"
                >
                  Make Another Reservation
                </Button>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </main>
    </>
  );
}
