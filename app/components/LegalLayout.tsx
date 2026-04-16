import Navbar from './Navbar'
import Footer from './Footer'

interface Section {
  heading: string
  body: React.ReactNode
}

interface Props {
  title: string
  subtitle: string
  lastUpdated: string
  sections: Section[]
}

export default function LegalLayout({ title, subtitle, lastUpdated, sections }: Props) {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <section className="relative px-4 pb-16 pt-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-purple/8 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{title}</h1>
          <p className="text-lg text-gray-400">{subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <div className="px-4 pb-28">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="border-t border-white/5 pt-10">
              <h2 className="mb-4 text-xl font-semibold text-white">{section.heading}</h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-400">
                {section.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <Footer />
    </main>
  )
}
