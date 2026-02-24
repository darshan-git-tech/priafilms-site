import { Link } from 'react-router-dom'
import { FaInstagram, FaYoutube, FaVimeoV, FaFacebookF } from 'react-icons/fa'

const socials = [
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: FaVimeoV, href: 'https://vimeo.com', label: 'Vimeo' },
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-gray border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex flex-col leading-none mb-4">
            <span className="font-heading text-2xl font-bold tracking-widest text-brand-light">PRIA</span>
            <span className="text-[10px] tracking-[0.35em] text-brand-gold font-medium">FILMS</span>
          </Link>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Crafting cinematic stories that resonate. Independent film production based in New York.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-brand-gold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-white/60">
            {[['/', 'Home'], ['/about', 'About Us'], ['/portfolio', 'Portfolio'], ['/contact', 'Contact Us']].map(
              ([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-brand-gold transition-colors">{label}</Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-brand-gold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 border border-white/20 rounded-sm flex items-center justify-center
                           text-white/60 hover:text-brand-gold hover:border-brand-gold transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-5 text-xs text-white/30 tracking-wider">
        © {new Date().getFullYear()} PRIA FILMS. All rights reserved.
      </div>
    </footer>
  )
}
