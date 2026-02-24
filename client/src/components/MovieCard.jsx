import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'

export default function MovieCard({ movie }) {
  const { slug, title, year, genres = [], thumbnailUrl, description } = movie

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-brand-gray rounded-sm overflow-hidden border border-white/5
                 hover:border-brand-gold/40 transition-colors duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <FaPlay className="text-brand-gold opacity-30" size={32} />
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-brand-dark/70 opacity-0 group-hover:opacity-100
                        flex items-center justify-center transition-opacity duration-300">
          <Link
            to={`/portfolio/${slug}`}
            className="flex items-center gap-2 px-4 py-2 border border-brand-gold text-brand-gold
                       text-sm tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-colors"
          >
            <FaPlay size={10} /> View Film
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading text-lg text-brand-light group-hover:text-brand-gold transition-colors">
            {title}
          </h3>
          {year && <span className="text-xs text-white/40 shrink-0 mt-1">{year}</span>}
        </div>

        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {genres.map((g) => (
              <span key={g} className="text-[10px] px-2 py-0.5 border border-brand-gold/30 text-brand-gold/70 rounded-sm tracking-wider">
                {g}
              </span>
            ))}
          </div>
        )}

        {description && (
          <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">{description}</p>
        )}
      </div>
    </motion.article>
  )
}
