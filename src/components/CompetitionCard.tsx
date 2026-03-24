import { Link } from 'react-router';
import { Calendar, Award, ArrowRight, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CompetitionCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  deadline: string;
  prize?: string;
  image?: string;
  venue?: string;
  city?: string;
}

export function CompetitionCard({ id, title, category, description, deadline, prize, image, venue, city }: CompetitionCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Art: 'bg-gradient-to-r from-purple-500 to-violet-500 text-white',
      Dance: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
      Music: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
      Concert: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
      Writing: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
      Photography: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
      Film: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
      Comedy: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
      Festival: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white',
      Literature: 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white',
      'Music Festival': 'bg-gradient-to-r from-violet-500 to-purple-500 text-white',
    };
    return colors[category] || 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
  };

  return (
    <Link to={`/competition/${id}`} className="group block">
      <div className="rounded-3xl border border-white/15 bg-white/10 overflow-hidden shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        {/* Event Image */}
        {image && (
          <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
            <ImageWithFallback 
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {/* Category Badge on Image */}
            <div className="absolute top-3 left-3">
              <span className={`px-3 py-1.5 rounded-full text-xs shadow-lg ${getCategoryColor(category)}`}>
                {category}
              </span>
            </div>
          </div>
        )}

        <div className="p-5">
          {/* Title */}
          <h3 className="mb-3 min-h-[3.5rem] line-clamp-2 text-white transition-all group-hover:bg-gradient-to-r group-hover:from-pink-300 group-hover:to-cyan-300 group-hover:bg-clip-text group-hover:text-transparent">
            {title}
          </h3>
          
          {/* Details */}
          <div className="space-y-2 mb-4">
            {/* Date/Time */}
            <div className="flex items-start gap-2 text-sm text-purple-200">
              <Calendar size={16} className="text-purple-300 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{deadline}</span>
            </div>

            {/* Venue/Location */}
            {venue && (
              <div className="flex items-start gap-2 text-sm text-purple-200">
                <MapPin size={16} className="text-pink-300 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{venue}</span>
              </div>
            )}

            {/* Price */}
            {prize && (
              <div className="flex items-center gap-2 text-sm">
                <Award size={16} className="text-indigo-300 flex-shrink-0" />
                <span className="text-white">{prize}</span>
              </div>
            )}
          </div>
          
          {/* CTA Button */}
          <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all group-hover:gap-3 shadow-lg hover:shadow-xl">
            <span className="text-sm">Book Now</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </Link>
  );
}
