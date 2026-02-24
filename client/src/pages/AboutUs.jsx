import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FaTrophy } from 'react-icons/fa'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import { useAbout } from '../hooks/useAbout'

function TeamCard({ member }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-brand-gray border border-white/5 rounded-sm overflow-hidden hover:border-brand-gold/30 transition-colors"
    >
      <div className="aspect-[3/4] bg-white/5 overflow-hidden">
        {member.photo ? (
          <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-white/10 font-heading">
            {member.name?.[0]}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg text-brand-light">{member.name}</h3>
        <p className="text-xs text-brand-gold tracking-widest uppercase mt-1 mb-3">{member.role}</p>
        <p className="text-sm text-white/50 leading-relaxed">{member.bio}</p>
      </div>
    </motion.div>
  )
}

export default function AboutUs() {
  const { data, isLoading } = useAbout()

  const about = data ?? {
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

  return (
    <PageTransition>
      <Helmet>
        <title>About Us – PRIA FILMS</title>
        <meta name="description" content="Learn about PRIA FILMS – our history, mission, team, and awards." />
      </Helmet>

      {/* Page Hero */}
      <div className="relative pt-32 pb-20 px-6 text-center bg-brand-gray border-b border-white/10">
        <span className="text-xs tracking-[0.3em] text-brand-gold uppercase">Our Story</span>
        <h1 className="font-heading text-5xl md:text-7xl text-white mt-3">About Us</h1>
      </div>

      {/* History & Mission */}
      <section className="section-padding max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <SectionHeader eyebrow="Our History" title="A Decade of Cinema" />
          <p className="text-white/60 leading-relaxed text-lg">{about.history}</p>
        </div>
        <div>
          <SectionHeader eyebrow="Our Mission" title="Why We Make Films" />
          <p className="text-white/60 leading-relaxed text-lg">{about.mission}</p>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-brand-gray">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="The Crew" title="Meet the Team" />
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-sm" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {about.team.map((m) => <TeamCard key={m.name} member={m} />)}
            </div>
          )}
        </div>
      </section>

      {/* Awards */}
      <section className="section-padding max-w-7xl mx-auto">
        <SectionHeader eyebrow="Recognition" title="Awards & Festivals" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {about.awards.map((award) => (
            <div
              key={`${award.title}-${award.year}`}
              className="bg-brand-gray border border-white/5 rounded-sm p-6 hover:border-brand-gold/40 transition-colors"
            >
              <FaTrophy className="text-brand-gold mb-4" size={24} />
              <p className="font-heading text-lg text-white mb-1">{award.title}</p>
              <p className="text-sm text-white/50">{award.festival}</p>
              <p className="text-xs text-brand-gold mt-2">{award.year}</p>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  )
}
