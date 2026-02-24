import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaChevronDown, FaPlay } from 'react-icons/fa'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import MovieCard from '../components/MovieCard'
import { useFeaturedMovies } from '../hooks/useMovies'

export default function Home() {
  const { data: featured = [], isLoading } = useFeaturedMovies()

  return (
    <PageTransition>
      <Helmet>
        <title>PRIA FILMS – Cinematic Storytelling</title>
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-brand-dark">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-hero-gradient" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 1 }}
            className="block text-brand-gold text-xs font-medium tracking-[0.35em] uppercase mb-6"
          >
            Independent Film Production
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl font-bold text-white leading-none mb-4"
          >
            PRIA <span className="text-brand-gold italic">FILMS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Stories that move you. Frames that linger. Cinema crafted with intention.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/portfolio" className="btn-primary">
              <FaPlay size={12} /> Explore Films
            </Link>
            <Link to="/about" className="btn-outline">
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 z-10 text-white/30"
        >
          <FaChevronDown size={20} />
        </motion.div>
      </section>

      {/* ── Featured Films ── */}
      <section className="section-padding max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Spotlight"
          title="Featured Films"
          subtitle="A curated selection from our most acclaimed productions."
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-white/5 animate-pulse rounded-sm" />
            ))}
          </div>
        ) : featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-center py-16">Films coming soon.</p>
        )}

        <div className="mt-12 text-center">
          <Link to="/portfolio" className="btn-outline">
            View Full Portfolio
          </Link>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="border-y border-white/10 py-12 bg-brand-gray">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '30+', label: 'Films Produced' },
            { value: '15', label: 'Awards Won' },
            { value: '8', label: 'Countries' },
            { value: '2014', label: 'Founded' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-heading text-4xl text-brand-gold mb-1">{value}</div>
              <div className="text-xs text-white/40 tracking-widest uppercase">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding text-center max-w-3xl mx-auto">
        <SectionHeader
          eyebrow="Work With Us"
          title="Have a Story to Tell?"
          subtitle="We collaborate with visionary creators, brands, and storytellers. Let's bring your vision to life."
          center
        />
        <Link to="/contact" className="btn-primary">
          Get in Touch
        </Link>
      </section>
    </PageTransition>
  )
}
