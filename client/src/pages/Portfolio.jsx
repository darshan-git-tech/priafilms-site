import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaSearch } from 'react-icons/fa'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import MovieCard from '../components/MovieCard'
import { useMovies } from '../hooks/useMovies'

const GENRES = ['All', 'Drama', 'Documentary', 'Thriller', 'Romance', 'Short Film']

export default function Portfolio() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useMovies({ search, genre: genre === 'All' ? '' : genre, page })
  const movies = data?.movies ?? []
  const totalPages = data?.totalPages ?? 1

  const handleGenre = (g) => {
    setGenre(g)
    setPage(1)
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Portfolio – PRIA FILMS</title>
        <meta name="description" content="Browse every film produced by PRIA FILMS." />
      </Helmet>

      {/* Page Hero */}
      <div className="relative pt-32 pb-20 px-6 text-center bg-brand-gray border-b border-white/10">
        <span className="text-xs tracking-[0.3em] text-brand-gold uppercase">Our Work</span>
        <h1 className="font-heading text-5xl md:text-7xl text-white mt-3">Portfolio</h1>
      </div>

      <section className="section-padding max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={13} />
            <input
              type="search"
              placeholder="Search films..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full bg-brand-gray border border-white/10 rounded-sm pl-9 pr-4 py-2.5 text-sm
                         text-brand-light placeholder:text-white/30 focus:outline-none focus:border-brand-gold
                         transition-colors"
            />
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => handleGenre(g)}
                className={`px-4 py-2 text-xs tracking-wider uppercase rounded-sm border transition-colors
                  ${genre === g
                    ? 'bg-brand-gold border-brand-gold text-brand-dark font-semibold'
                    : 'border-white/20 text-white/50 hover:border-brand-gold/50 hover:text-white/80'
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-video bg-white/5 animate-pulse rounded-sm" />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
          </div>
        ) : (
          <div className="text-center py-24 text-white/40">No films found.</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 text-sm rounded-sm border transition-colors
                  ${page === p
                    ? 'bg-brand-gold border-brand-gold text-brand-dark font-semibold'
                    : 'border-white/20 text-white/50 hover:border-brand-gold/50'
                  }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  )
}
