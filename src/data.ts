import { MenuItem, Testimonial } from './types';

export const FEATURED_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Luna Signature Latte',
    description: 'Our house espresso with velvety steamed milk and a hint of vanilla bean and gold dust.',
    price: '$6.50',
    category: 'Latte',
    image: '/images/img_9baf605d.jpg',
    popular: true,
  },
  {
    id: 'm2',
    name: 'Single Origin Pour Over',
    description: 'Rotating selection of single-origin beans, hand-poured for ultimate clarity and flavor.',
    price: '$5.50',
    category: 'Coffee',
    image: '/images/img_758ce9ee.jpg',
  },
  {
    id: 'm3',
    name: 'Cold Brew Reserve',
    description: 'Slow-steeped for 24 hours, incredibly smooth with chocolate and cherry tasting notes.',
    price: '$5.00',
    category: 'Cold Brew',
    image: '/images/img_3bf94f47.jpg',
    badges: ['Staff Pick'],
  },
  {
    id: 'm4',
    name: 'Matcha Blossom',
    description: 'Ceremonial grade matcha whisked with oat milk and a touch of lavender syrup.',
    price: '$6.00',
    category: 'Tea',
    image: '/images/img_d7fd4f68.jpg',
    popular: true,
  },
  {
    id: 'm5',
    name: 'Artisan Croissant',
    description: 'Flaky, buttery, baked fresh in-house every morning.',
    price: '$4.50',
    category: 'Breakfast',
    image: '/images/img_7354bac2.jpg',
  },
  {
    id: 'm6',
    name: 'Dark Chocolate Tart',
    description: 'Rich ganache in a crisp pastry shell, finished with sea salt.',
    price: '$7.00',
    category: 'Desserts',
    image: '/images/img_d68a8929.jpg',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    quote: 'The best espresso I\'ve had outside of Italy. The atmosphere is incredibly calming, making it my favorite weekend retreat.',
    rating: 5,
    avatar: '/images/img_b6eee26d.jpg'
  },
  {
    id: 't2',
    name: 'Michael Chen',
    quote: 'Beautifully designed space and the pour-over coffee is exceptional. The staff really knows their craft.',
    rating: 5,
    avatar: '/images/img_16221fb6.jpg'
  },
  {
    id: 't3',
    name: 'Emma Thompson',
    quote: 'A true hidden gem. The matcha blossom is a work of art, both visually and in taste. Highly recommend reserving a table on weekends.',
    rating: 5,
    avatar: '/images/img_cb2ae043.jpg'
  }
];

export const GALLERY_IMAGES = [
  '/images/img_212587f2.jpg',
  '/images/img_682d4b43.jpg',
  '/images/img_dff342a7.jpg',
  '/images/img_3e7e80bb.jpg',
  '/images/img_38f84fe4.jpg',
  '/images/img_e5bf5a4d.jpg',
];
