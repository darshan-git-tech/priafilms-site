import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaEnvelope, FaPhone, FaInstagram, FaYoutube, FaVimeoV } from 'react-icons/fa'
import toast from 'react-hot-toast'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import { submitContact } from '../api/contact'

const initialForm = { name: '', email: '', phone: '', message: '' }

export default function ContactUs() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    setLoading(true)
    try {
      await submitContact(form)
      toast.success('Message sent! We\'ll be in touch soon.')
      setForm(initialForm)
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const field = (name, label, type = 'text', rows) => (
    <div>
      <label htmlFor={name} className="block text-xs tracking-widest uppercase text-white/50 mb-2">
        {label} {['name','email','message'].includes(name) && <span className="text-brand-gold">*</span>}
      </label>
      {rows ? (
        <textarea
          id={name} name={name} rows={rows} value={form[name]} onChange={handleChange}
          className={`w-full bg-brand-gray border rounded-sm px-4 py-3 text-sm text-brand-light
                      placeholder:text-white/20 focus:outline-none focus:border-brand-gold transition-colors resize-none
                      ${errors[name] ? 'border-red-500' : 'border-white/10'}`}
        />
      ) : (
        <input
          id={name} name={name} type={type} value={form[name]} onChange={handleChange}
          className={`w-full bg-brand-gray border rounded-sm px-4 py-3 text-sm text-brand-light
                      placeholder:text-white/20 focus:outline-none focus:border-brand-gold transition-colors
                      ${errors[name] ? 'border-red-500' : 'border-white/10'}`}
        />
      )}
      {errors[name] && <p className="mt-1 text-xs text-red-400">{errors[name]}</p>}
    </div>
  )

  return (
    <PageTransition>
      <Helmet>
        <title>Contact Us – PRIA FILMS</title>
        <meta name="description" content="Get in touch with PRIA FILMS for collaborations, inquiries, and more." />
      </Helmet>

      {/* Page Hero */}
      <div className="relative pt-32 pb-20 px-6 text-center bg-brand-gray border-b border-white/10">
        <span className="text-xs tracking-[0.3em] text-brand-gold uppercase">Reach Out</span>
        <h1 className="font-heading text-5xl md:text-7xl text-white mt-3">Contact Us</h1>
      </div>

      <section className="section-padding max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <SectionHeader eyebrow="Send a Message" title="Let's Talk" />
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {field('name', 'Full Name')}
            {field('email', 'Email Address', 'email')}
            {field('phone', 'Phone Number', 'tel')}
            {field('message', 'Your Message', 'text', 5)}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Info */}
        <div>
          <SectionHeader eyebrow="Find Us" title="Contact Info" />

          <ul className="space-y-6 mb-10">
            <li className="flex items-start gap-4">
              <FaEnvelope className="text-brand-gold mt-1 shrink-0" />
              <div>
                <p className="text-xs text-white/40 tracking-widest uppercase mb-1">Email</p>
                <a href="mailto:hello@priafilms.com" className="text-white/70 hover:text-brand-gold transition-colors">
                  hello@priafilms.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FaPhone className="text-brand-gold mt-1 shrink-0" />
              <div>
                <p className="text-xs text-white/40 tracking-widest uppercase mb-1">Phone</p>
                <a href="tel:+12125550100" className="text-white/70 hover:text-brand-gold transition-colors">
                  +1 (212) 555-0100
                </a>
              </div>
            </li>
          </ul>

          <div>
            <p className="text-xs text-white/40 tracking-widest uppercase mb-4">Follow Us</p>
            <div className="flex gap-3">
              {[
                { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
                { icon: FaVimeoV, href: 'https://vimeo.com', label: 'Vimeo' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-white/20 rounded-sm flex items-center justify-center
                             text-white/50 hover:text-brand-gold hover:border-brand-gold transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
