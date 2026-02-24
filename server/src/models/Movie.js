const mongoose = require('mongoose')
const slugify = require('slugify')

const reviewSchema = new mongoose.Schema({
  source: { type: String, required: true },
  quote: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
})

const crewMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
})

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, default: '' },
    year: { type: Number },
    runtime: { type: Number }, // minutes
    genres: [{ type: String }],
    cast: [{ type: String }],
    crew: [crewMemberSchema],
    thumbnailUrl: { type: String, default: '' },
    trailerUrls: [{ type: String }],
    btsUrls: [{ type: String }],
    reviews: [reviewSchema],
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
)

// Auto-generate slug from title before saving
movieSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

// Full-text search index
movieSchema.index({ title: 'text', description: 'text' })

module.exports = mongoose.model('Movie', movieSchema)
