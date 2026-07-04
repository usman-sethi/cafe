import { MenuItem, Testimonial } from './types';

export const FEATURED_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Luna Signature Latte',
    description: 'Our house espresso with velvety steamed milk and a hint of vanilla bean and gold dust.',
    price: '$6.50',
    category: 'Latte',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 'm2',
    name: 'Single Origin Pour Over',
    description: 'Rotating selection of single-origin beans, hand-poured for ultimate clarity and flavor.',
    price: '$5.50',
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm3',
    name: 'Cold Brew Reserve',
    description: 'Slow-steeped for 24 hours, incredibly smooth with chocolate and cherry tasting notes.',
    price: '$5.00',
    category: 'Cold Brew',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    badges: ['Staff Pick'],
  },
  {
    id: 'm4',
    name: 'Matcha Blossom',
    description: 'Ceremonial grade matcha whisked with oat milk and a touch of lavender syrup.',
    price: '$6.00',
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1536514072410-5019a3c69182?auto=format&fit=crop&w=800&q=80',
    popular: true,
  },
  {
    id: 'm5',
    name: 'Artisan Croissant',
    description: 'Flaky, buttery, baked fresh in-house every morning.',
    price: '$4.50',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'm6',
    name: 'Dark Chocolate Tart',
    description: 'Rich ganache in a crisp pastry shell, finished with sea salt.',
    price: '$7.00',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    quote: 'The best espresso I\'ve had outside of Italy. The atmosphere is incredibly calming, making it my favorite weekend retreat.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1536514072410-5019a3c69182?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 't2',
    name: 'Michael Chen',
    quote: 'Beautifully designed space and the pour-over coffee is exceptional. The staff really knows their craft.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 't3',
    name: 'Emma Thompson',
    quote: 'A true hidden gem. The matcha blossom is a work of art, both visually and in taste. Highly recommend reserving a table on weekends.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1463797221720-6b07e6426c24?auto=format&fit=crop&w=800&q=80'
  }
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
];
