import { useState } from 'react';
import { SEO } from '@/components/SEO';
import { ArrowRight, Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Art of the Perfect Pour-Over",
    excerpt: "Discover the meticulous process behind our signature pour-over coffees and why the brewing method matters just as much as the bean.",
    date: "May 15, 2024",
    category: "Brewing Guide",
    readingTime: "5 min read",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Sourcing Sustainably: Our Trip to Colombia",
    excerpt: "Join us as we recap our recent trip to the Andean mountains to meet the farmers behind our favorite single-origin espresso.",
    date: "April 22, 2024",
    category: "Origins",
    readingTime: "8 min read",
    image: "https://images.unsplash.com/photo-1463797221720-6b07e6426c24?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Summer Menu Highlight: Lavender Cold Brew",
    excerpt: "Learn how we infuse our slow-steeped cold brew with locally grown lavender for the ultimate refreshing summer beverage.",
    date: "June 05, 2024",
    category: "Seasonal",
    readingTime: "3 min read",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "The Science of Milk Steaming",
    excerpt: "What makes microfoam so velvety? We break down the chemistry and technique behind perfectly steamed milk.",
    date: "July 12, 2024",
    category: "Brewing Guide",
    readingTime: "6 min read",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = BLOG_POSTS.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = BLOG_POSTS[0];

  return (
    <>
      <SEO 
        title="Journal" 
        description="Read our latest thoughts, brewing guides, and stories from the origin." 
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Luna Café Journal",
          "description": "Read our latest thoughts, brewing guides, and stories from the origin.",
          "url": "https://lunacafe.com/blog",
          "blogPost": BLOG_POSTS.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": new Date(post.date).toISOString(),
            "image": post.image
          }))
        }}
      />
      <main className="min-h-screen pt-28 pb-24 bg-cream">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h1 className="text-5xl font-serif text-coffee-950 mb-4">The Journal</h1>
              <p className="text-coffee-700 max-w-xl text-lg">
                Stories from the roastery, brewing guides, and our coffee journey.
              </p>
            </div>
            <div className="relative w-full md:w-80 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-coffee-700" />
              </div>
              <input
                type="text"
                value={searchQuery}
                aria-label="Search articles"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-white border border-coffee-200 text-coffee-900 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
              />
            </div>
          </div>

          {!searchQuery && (
            <div className="mb-16">
              <span className="text-gold font-bold tracking-widest uppercase text-sm mb-6 block">Featured Article</span>
              <article className="bg-white rounded-3xl overflow-hidden shadow-md flex flex-col lg:flex-row border border-coffee-100/50">
                <div className="lg:w-3/5 h-80 lg:h-[500px] overflow-hidden relative">
                  <img referrerPolicy="no-referrer" 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    fetchPriority="high"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-sm font-bold uppercase tracking-wider text-coffee-900">{featuredPost.category}</span>
                  </div>
                </div>
                <div className="lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-coffee-700 font-mono mb-4 space-x-4">
                    <span>{featuredPost.date}</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {featuredPost.readingTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-coffee-950 mb-6 leading-tight">{featuredPost.title}</h2>
                  <p className="text-coffee-700 mb-8 text-lg leading-relaxed">{featuredPost.excerpt}</p>
                  <Link to="#" className="inline-flex items-center bg-coffee-950 text-white hover:bg-gold px-6 py-3 rounded-full transition-colors self-start font-medium">
                    Read Article <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </article>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-coffee-100/50 flex flex-col group">
                <div className="h-64 overflow-hidden relative">
                  <img referrerPolicy="no-referrer" 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-coffee-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-center text-sm text-coffee-700 mb-3 font-mono">
                    <span>{post.date}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.readingTime}</span>
                  </div>
                  <h2 className="text-2xl font-serif text-coffee-950 mb-4 leading-tight group-hover:text-gold transition-colors">{post.title}</h2>
                  <p className="text-coffee-700 mb-6 flex-grow">{post.excerpt}</p>
                  <Link to="#" className="inline-flex items-center text-coffee-900 hover:text-gold font-medium transition-colors">
                    Read Article <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-coffee-700 text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
