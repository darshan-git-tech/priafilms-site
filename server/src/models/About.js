const mongoose = require('mongoose')

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, default: '' },
  photo: { type: String, default: '' },
})

const awardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  festival: { type: String, required: true },
  year: { type: Number, required: true },
})

const aboutSchema = new mongoose.Schema(
  {
    history: { type: String, default: '' },
    mission: { type: String, default: '' },
    team: [teamMemberSchema],
    awards: [awardSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('About', aboutSchema)
