import { Link } from 'react-router-dom';
import { Star, MessageCircle, Mail } from 'lucide-react';
import { buildWhatsAppUrl, buildEmailUrl } from '../utils/whatsapp';

export default function HotelCard({ hotel }) {
  const rating = hotel.rating || 4.5;

  return (
    <Link
      to={`/hotels/${hotel.slug}`}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Full-bleed image */}
      <div className="relative h-56 overflow-hidden bg-slate-200">
        <img
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          src={hotel.image || hotel.coverImage || 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1776174364/kashmir-travels/1000094793.jpg'}
        />
        {/* Dark gradient fade at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h4 className="text-base font-bold text-slate-900 leading-tight">{hotel.name}</h4>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {hotel.description || 'Experience luxury and comfort in the heart of Kashmir.'}
        </p>

        {/* Tags row */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {rating}
          </span>
          {hotel.category && (
            <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
              {hotel.category}
            </span>
          )}
          {hotel.amenities && hotel.amenities.slice(0, 1).map((a, i) => (
            <span key={i} className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
              {a}
            </span>
          ))}
        </div>

        {/* CTA – WhatsApp + Email */}
        <div className="flex gap-2 mt-3">
          <a
            href={buildWhatsAppUrl(hotel.name)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={buildEmailUrl(hotel.name)}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
      </div>
    </Link>
  );
}
