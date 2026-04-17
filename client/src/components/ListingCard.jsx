import { Link } from 'react-router-dom';
import { Bookmark, Star } from 'lucide-react';

/**
 * Universal listing card — matches reference design.
 * Props:
 *   to          – destination href
 *   image       – cover image URL
 *   title       – card heading
 *   description – short text (line-clamp-2)
 *   price       – formatted string e.g. "₹4,500"
 *   priceUnit   – e.g. "/night", "/person", "/day"
 *   rating      – number (default 4.8)
 *   tags        – string[] up to 2 chips shown
 *   cta         – button label (default "Enquiry on WhatsApp")
 */
export default function ListingCard({
  to,
  image,
  title,
  description,
  price,
  priceUnit = '',
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
        {/* Bookmark */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Bookmark className="w-4 h-4 text-slate-700" />
        </div>
        {/* Price pill */}
        {price && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-sm font-bold shadow">
            {price}
            {priceUnit && <span className="text-xs font-medium text-slate-500">{priceUnit}</span>}
          </div>
        )}
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

        {/* CTA */}
        <button className="mt-3 w-full py-2.5 rounded-full border border-slate-200 bg-white text-slate-900 text-sm font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200">
          {cta}
        </button>
      </div>
    </Link>
  );
}
