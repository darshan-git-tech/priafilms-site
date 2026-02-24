export default function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className="text-xs tracking-[0.3em] uppercase text-brand-gold font-medium block mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className={`section-title pb-4 gold-underline inline-block ${center ? 'mx-auto' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-white/60 max-w-2xl leading-relaxed text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
