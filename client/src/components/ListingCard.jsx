import { Link } from 'react-router-dom';
import { Star, MessageCircle, Mail } from 'lucide-react';
import { buildWhatsAppUrl, buildEmailUrl } from '../utils/whatsapp';

/**
 * Universal listing card — matches reference design.
 * Props:
 *   to          – destination href
 *   image       – cover image URL
 *   title       – card heading
 *   description – short text (line-clamp-2)
 *   rating      – number (default 4.8)
 *   tags        – string[] up to 2 chips shown
 *   cta         – button label (default "Enquiry on WhatsApp")
 */
export default function ListingCard({
  to,
  image,
  title,
  description,
  rating = 4.8,
  tags = [],
  cta = 'Enquiry on WhatsApp',
}) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Full-bleed image */}
      <div className="relative h-56 overflow-hidden bg-slate-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h4 className="text-base font-bold text-slate-900 leading-tight">{title}</h4>
        {description && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{description}</p>
        )}

        {/* Tags row */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {rating}
          </span>
          {tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA – WhatsApp + Email */}
        <div className="flex gap-2 mt-3">
          <a
            href={buildWhatsAppUrl(title)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <a
            href={buildEmailUrl(title)}
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
