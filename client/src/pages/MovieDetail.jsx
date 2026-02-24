import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaArrowLeft, FaStar, FaShare } from 'react-icons/fa'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { useMovieDetail } from '../hooks/useMovies'

function TrailerEmbed({ url }) {
  // Support YouTube / Vimeo
  const isYoutube = url?.includes('youtube.com') || url?.includes('youtu.be')
  const videoId = isYoutube
    ? url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
    : url.split('/').pop()
  const src = isYoutube
    ? `https://www.youtube.com/embed/${videoId}`
    : `https://player.vimeo.com/video/${videoId}`

  return (
    <div className="aspect-video rounded-sm overflow-hidden border border-white/10">
      <iframe
        src={src}
        title="Trailer"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default function MovieDetail() {
  const { slug } = useParams()
  const { data: movie, isLoading, isError } = useMovieDetail(slug)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-white/50">
        <p className="text-xl">Film not found.</p>
        <Link to="/portfolio" className="btn-outline">← Back to Portfolio</Link>
      </div>
    )
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{movie.title} – PRIA FILMS</title>
        <meta name="description" content={movie.description} />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[60vh] bg-brand-dark overflow-hidden">
        {movie.thumbnailUrl && (
          <img
            src={movie.thumbnailUrl}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-24 pb-12 max-w-7xl mx-auto">
          <Link to="/portfolio" className="flex items-center gap-2 text-white/50 hover:text-brand-gold text-sm mb-6 transition-colors">
            <FaArrowLeft size={12} /> Back to Portfolio
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres?.map((g) => (
              <span key={g} className="text-[10px] border border-brand-gold/50 text-brand-gold px-2 py-1 tracking-widest uppercase rounded-sm">
                {g}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-4xl md:text-6xl text-white mb-2">{movie.title}</h1>
          <div className="flex items-center gap-4 text-white/40 text-sm">
            {movie.year && <span>{movie.year}</span>}
            {movie.runtime && <span>{movie.runtime} min</span>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-24 py-16 grid md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          {/* Description */}
          <div>
            <h2 className="font-heading text-2xl text-white mb-4">Synopsis</h2>
            <p className="text-white/60 leading-relaxed text-lg">{movie.description}</p>
          </div>

          {/* Trailers */}
          {movie.trailerUrls?.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl text-white mb-6">Trailers</h2>
              <div className="space-y-6">
                {movie.trailerUrls.map((url, i) => <TrailerEmbed key={i} url={url} />)}
              </div>
            </div>
          )}

          {/* BTS Gallery */}
          {movie.btsUrls?.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl text-white mb-6">Behind the Scenes</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {movie.btsUrls.map((url, i) => (
                  <motion.img
                    key={i}
                    src={url}
                    alt={`BTS ${i + 1}`}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-sm aspect-video object-cover cursor-pointer border border-white/5"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {movie.reviews?.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl text-white mb-6">Reviews</h2>
              <div className="space-y-4">
                {movie.reviews.map((r, i) => (
                  <div key={i} className="bg-brand-gray border-l-2 border-brand-gold p-6 rounded-sm">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, s) => (
                        <FaStar key={s} size={12} className={s < r.rating ? 'text-brand-gold' : 'text-white/20'} />
                      ))}
                    </div>
                    <p className="text-white/70 italic mb-3">"{r.quote}"</p>
                    <p className="text-sm text-brand-gold">— {r.source}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Cast */}
          {movie.cast?.length > 0 && (
            <div>
              <h3 className="font-heading text-xl text-white mb-4 border-b border-white/10 pb-2">Cast</h3>
              <ul className="space-y-2">
                {movie.cast.map((c) => (
                  <li key={c} className="text-sm text-white/60 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-gold inline-block" />{c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Crew */}
          {movie.crew?.length > 0 && (
            <div>
              <h3 className="font-heading text-xl text-white mb-4 border-b border-white/10 pb-2">Crew</h3>
              <ul className="space-y-2">
                {movie.crew.map((c) => (
                  <li key={c.name} className="text-sm">
                    <span className="text-white/40 block text-xs tracking-widest uppercase">{c.role}</span>
                    <span className="text-white/70">{c.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Share */}
          <button
            onClick={() => navigator.share?.({ title: movie.title, url: window.location.href })}
            className="btn-outline w-full justify-center"
          >
            <FaShare size={13} /> Share Film
          </button>
        </aside>
      </div>
    </PageTransition>
  )
}
