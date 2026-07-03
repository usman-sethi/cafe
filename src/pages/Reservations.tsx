import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { initAuth, googleSignIn } from '@/lib/auth';
import { getSpreadsheetId, appendRow } from '@/lib/sheets';
import { User } from 'firebase/auth';
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
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setUser(user);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setNeedsAuth(false);
        setUser(result.user);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormValues) => {
    try {
      const spreadsheetId = await getSpreadsheetId();
      if (!spreadsheetId) throw new Error("Could not create/get spreadsheet");
      
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
      
      await appendRow(spreadsheetId, 'Reservations', row);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit reservation:", error);
      alert("Failed to submit reservation. Please make sure you are signed in and have granted Google Sheets permissions.");
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
                
                {needsAuth ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                    <p className="text-coffee-600">Please sign in with Google to make a reservation so we can save it to our sheets.</p>
                    <button 
                      onClick={handleLogin}
                      disabled={isLoggingIn}
                      className="gsi-material-button w-full max-w-xs h-12 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center transition-colors shadow-sm"
                    >
                      <div className="flex items-center space-x-3">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                          <path fill="none" d="M0 0h48v48H0z"></path>
                        </svg>
                        <span className="font-medium text-gray-600 font-sans">{isLoggingIn ? 'Signing in...' : 'Sign in with Google'}</span>
                      </div>
                    </button>
                  </div>
                ) : (
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
                )}
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
