import { Link } from 'react-router';
import { Award, Calendar, Info, MapPin, Ticket } from 'lucide-react';
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
  registrationDeadline?: string;
  ageGroup?: string;
  submissionFormat?: string;
  registrationLink?: string;
}

export function CompetitionCard({
  id,
  title,
  category,
  description,
  deadline,
  prize,
  image,
  venue,
  city,
  registrationDeadline,
  ageGroup,
  submissionFormat,
  registrationLink,
}: CompetitionCardProps) {
  const getCategoryColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      'Drawing & Painting': 'from-purple-500 to-violet-500 text-white',
      'Article Writing': 'from-teal-500 to-cyan-500 text-white',
      Poetry: 'from-blue-500 to-cyan-500 text-white',
      'Skit / Drama': 'from-pink-500 to-rose-500 text-white',
      'Choreography / Dance': 'from-orange-500 to-amber-500 text-white',
      'Vlogs / Short Videos': 'from-indigo-500 to-blue-500 text-white',
      Speech: 'from-yellow-500 to-orange-500 text-white',
      'Creative Arts': 'from-fuchsia-500 to-pink-500 text-white',
      'Literary & Oratory': 'from-green-500 to-emerald-500 text-white',
      'Performing Arts': 'from-red-500 to-orange-500 text-white',
      'Digital Media': 'from-slate-500 to-slate-700 text-white',
    };
    return colors[categoryName] || 'from-gray-500 to-gray-600 text-white';
  };

  const cardStyle = {
    background:
      'linear-gradient(180deg, rgba(34,42,68,0.97) 0%, rgba(84,43,135,0.93) 100%)',
    boxShadow: '0 24px 52px rgba(22, 16, 53, 0.34)',
  };
  const contentStyle = {
    background:
      'linear-gradient(180deg, rgba(104,56,170,0.1) 0%, rgba(27,36,54,0.02) 100%)',
  };
  const subtleButtonStyle = {
    background: 'rgba(255,255,255,0.07)',
  };

  return (
    <article
      className="w-full max-w-[388px] overflow-hidden rounded-[3rem] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
      style={cardStyle}
    >
      <div className="relative h-44 overflow-hidden bg-white/5">
        {image ? (
          <ImageWithFallback
            src={image}
            alt={title}
            className="block h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 right-4 flex flex-wrap gap-2">
          <span className={`rounded-full bg-gradient-to-r px-3.5 py-1.5 text-[11px] leading-none shadow-lg ${getCategoryColor(category)}`}>
            {category}
          </span>
          {ageGroup ? (
            <span className="rounded-full border border-white/10 bg-black/35 px-3.5 py-1.5 text-[11px] leading-none text-white backdrop-blur-md">
              {ageGroup}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6" style={contentStyle}>
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-[1.22rem] leading-7 text-white">{title}</h3>
          <p className="line-clamp-3 min-h-[64px] text-[13px] leading-6 text-purple-100/85">
            {description}
          </p>
        </div>

        <div className="space-y-3 px-1 text-[12px]">
          <div className="flex items-start gap-2 text-purple-200">
            <div className="mt-0.5 rounded-full bg-black/15 p-1.5">
              <Calendar size={12} className="flex-shrink-0 text-purple-300" />
            </div>
            <span className="leading-5">{deadline}</span>
          </div>

          {(venue || city) && (
            <div className="flex items-start gap-2 text-purple-200">
              <div className="mt-0.5 rounded-full bg-black/15 p-1.5">
                <MapPin size={12} className="flex-shrink-0 text-pink-300" />
              </div>
              <span className="line-clamp-2 leading-5">{[venue, city].filter(Boolean).join(', ')}</span>
            </div>
          )}

          {(prize || submissionFormat) && (
            <div className="flex items-center gap-2 text-purple-200">
              <div className="rounded-full bg-black/15 p-1.5">
                <Award size={12} className="flex-shrink-0 text-indigo-300" />
              </div>
              <span className="line-clamp-1">{prize || submissionFormat}</span>
            </div>
          )}

          {registrationDeadline && (
            <div className="flex items-start gap-2 text-pink-100">
              <div className="mt-0.5 rounded-full bg-black/15 p-1.5">
                <Ticket size={12} className="flex-shrink-0 text-pink-300" />
              </div>
              <span className="leading-5">Register by {registrationDeadline}</span>
            </div>
          )}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 px-1">
          <Link
            to={registrationLink || `/checkout/${id}`}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-3 text-center text-[13px] text-white shadow-lg transition-all hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600"
          >
            <Ticket size={14} />
            <span>Register Now</span>
          </Link>
          <Link
            to={`/competition/${id}`}
            className="flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-center text-[12px] text-white transition-all hover:bg-white/10"
            style={subtleButtonStyle}
          >
            <Info size={13} />
            <span>Competition Info</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
