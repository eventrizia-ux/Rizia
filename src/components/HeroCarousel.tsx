import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Ticket } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { fetchActiveEvents } from '../utils/supabaseHelpers';

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  date: string;
  venue: string;
  buttonText: string;
  buttonLink: string;
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedCompetitions();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const loadFeaturedCompetitions = async () => {
    try {
      setLoading(true);
      const competitions = await fetchActiveEvents();
      
      // Take the first 4 competitions as featured slides, or use default if none
      const featuredCompetitions = competitions.slice(0, 4);
      
      if (featuredCompetitions.length > 0) {
        const competitionSlides: CarouselSlide[] = featuredCompetitions.map((competition: any, index: number) => ({
          id: competition.id,
          title: competition.title,
          subtitle: competition.description?.substring(0, 100) + (competition.description?.length > 100 ? '...' : ''),
          image: competition.image_url || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1080',
          category: competition.category,
          date: competition.registration_dead || 'Registration open',
          venue: competition.venue || 'TBD',
          buttonText: 'View Details',
          buttonLink: `/competition/${competition.id}`
        }));
        setSlides(competitionSlides);
      } else {
        // Fallback slides if no competitions in database
        setSlides([
          {
            id: 'default-1',
            title: 'Welcome to Rizia',
            subtitle: 'Discover amazing competitions and events',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1080',
            category: 'Featured',
            date: 'Coming Soon',
            venue: 'Online',
            buttonText: 'Explore',
            buttonLink: '/competitions'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading featured competitions:', error);
      // Fallback slides on error
      setSlides([
        {
          id: 'default-1',
          title: 'Welcome to Rizia',
          subtitle: 'Discover amazing competitions and events',
          image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1080',
          category: 'Featured',
          date: 'Coming Soon',
          venue: 'Online',
          buttonText: 'Explore',
          buttonLink: '/competitions'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-2xl text-white">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 animate-in fade-in slide-in-from-left duration-700">
                  <Ticket size={16} />
                  <span className="text-sm">{slide.category}</span>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4 animate-in fade-in slide-in-from-left duration-700" style={{ animationDelay: '100ms' }}>
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-200 mb-6 animate-in fade-in slide-in-from-left duration-700" style={{ animationDelay: '200ms' }}>
                  {slide.subtitle}
                </p>

                {/* Event Details */}
                <div className="flex flex-wrap gap-4 mb-8 animate-in fade-in slide-in-from-left duration-700" style={{ animationDelay: '300ms' }}>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                    <Calendar size={18} className="text-pink-400" />
                    <span className="text-sm">{slide.date}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                    <MapPin size={18} className="text-pink-400" />
                    <span className="text-sm">{slide.venue}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to={slide.buttonLink}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all shadow-2xl hover:shadow-pink-500/50 hover:scale-105 animate-in fade-in slide-in-from-left duration-700"
                  style={{ animationDelay: '400ms' }}
                >
                  <Ticket size={20} />
                  <span className="text-lg">{slide.buttonText}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-12 h-3 bg-gradient-to-r from-pink-500 to-purple-500'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}
