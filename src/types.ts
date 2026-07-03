export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'Coffee' | 'Espresso' | 'Latte' | 'Cold Brew' | 'Tea' | 'Desserts' | 'Breakfast' | 'Seasonal Drinks';
  image: string;
  popular?: boolean;
  badges?: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  rating: number;
  avatar: string;
};
