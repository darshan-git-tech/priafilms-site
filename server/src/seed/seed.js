require('dotenv').config()
const mongoose = require('mongoose')
const Movie = require('../models/Movie')
const About = require('../models/About')
const connectDB = require('../config/db')

const movies = [
  {
    title: 'The Last Canvas',
    description: 'A reclusive painter confronts her past when a mysterious art collector arrives in her remote coastal town.',
    year: 2023,
    runtime: 98,
    genres: ['Drama', 'Thriller'],
    cast: ['Aisha Reeves', 'Daniel Okonkwo', 'Meera Patel'],
    crew: [{ name: 'Priya Sharma', role: 'Director' }, { name: 'Arjun Mehta', role: 'Cinematographer' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800',
    trailerUrls: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
    reviews: [
      { source: 'Variety', quote: 'A visually arresting debut that announces Pria Films as a force to be reckoned with.', rating: 5 },
      { source: 'The Guardian', quote: 'Quietly powerful and deeply affecting.', rating: 4 },
    ],
    featured: true,
  },
  {
    title: 'Voices in the Rain',
    description: 'An oral history of three generations of women in a small Indian village, told through their songs.',
    year: 2022,
    runtime: 84,
    genres: ['Documentary'],
    cast: ['Kavitha Nair', 'Savitri Devi'],
    crew: [{ name: 'Priya Sharma', role: 'Director' }, { name: 'Leila Hassan', role: 'Producer' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1495815891636-29581fe822ea?w=800',
    trailerUrls: [],
    reviews: [
      { source: 'Sundance Selection', quote: 'Devastating and beautiful in equal measure.', rating: 5 },
    ],
    featured: true,
  },
  {
    title: 'Parallel Lines',
    description: 'Two strangers on opposite sides of a city discover their lives are more intertwined than either could imagine.',
    year: 2021,
    runtime: 112,
    genres: ['Drama', 'Romance'],
    cast: ['James Park', 'Sofia Almeida', 'Ben Ngozi'],
    crew: [{ name: 'Priya Sharma', role: 'Director' }, { name: 'Marcus Bell', role: 'Editor' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    trailerUrls: [],
    reviews: [],
    featured: true,
  },
  {
    title: 'Salt and Sky',
    description: 'A fisherman\'s daughter defies tradition to pursue her dream of becoming a marine biologist.',
    year: 2020,
    runtime: 91,
    genres: ['Drama'],
    cast: ['Mia Chen', 'Roberto Sanchez'],
    crew: [{ name: 'Priya Sharma', role: 'Director' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800',
    trailerUrls: [],
    reviews: [],
    featured: false,
  },
  {
    title: 'Ember',
    description: 'A 12-minute short film about a firefighter\'s last day before retirement.',
    year: 2019,
    runtime: 12,
    genres: ['Short Film', 'Drama'],
    cast: ['Tom Adeyemi'],
    crew: [{ name: 'Priya Sharma', role: 'Director' }],
    thumbnailUrl: 'https://images.unsplash.com/photo-1495044693165-c8f8b3e4f7f2?w=800',
    trailerUrls: [],
    reviews: [],
    featured: false,
  },
]

const about = {
  history: 'PRIA FILMS was founded in 2014 with a single mission: to tell bold, human stories through the art of cinema. From our first short film shot on a borrowed camera to internationally acclaimed features, every frame has been crafted with purpose.',
  mission: 'We believe cinema has the power to create empathy, spark conversation, and change perspectives. Our mission is to produce authentic, visually stunning films that resonate across cultures and generations.',
  team: [
    { name: 'Priya Sharma', role: 'Director & Founder', bio: 'Award-winning director with over 15 years of experience in independent cinema.', photo: '' },
    { name: 'Arjun Mehta', role: 'Cinematographer', bio: 'Visual storyteller known for his distinctive use of natural light and long takes.', photo: '' },
    { name: 'Leila Hassan', role: 'Producer', bio: 'Strategic creative producer who has shepherded projects to Sundance and TIFF.', photo: '' },
    { name: 'Marcus Bell', role: 'Editor', bio: 'Brings surgical precision and emotional rhythm to every cut in the editing suite.', photo: '' },
  ],
  awards: [
    { title: 'Best Film', festival: 'Sundance Film Festival', year: 2023 },
    { title: 'Best Director', festival: 'TIFF', year: 2022 },
    { title: 'Jury Prize', festival: 'Tribeca Film Festival', year: 2021 },
    { title: 'Best Cinematography', festival: 'SXSW', year: 2020 },
  ],
}

async function seed() {
  await connectDB()
  console.log('[seed] Connected. Clearing existing data...')
  await Promise.all([Movie.deleteMany({}), About.deleteMany({})])

  console.log('[seed] Inserting movies...')
  await Movie.insertMany(movies)

  console.log('[seed] Inserting about...')
  await About.create(about)

  console.log('[seed] Done!')
  mongoose.disconnect()
}

seed().catch((err) => {
  console.error('[seed] Error:', err)
  mongoose.disconnect()
  process.exit(1)
})
