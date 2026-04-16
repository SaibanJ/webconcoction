import ContactForm from './ContactForm'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 px-4 pt-20 pb-12">
      <div className="mx-auto max-w-6xl">

        {/* Contact section */}
        <div className="mb-20 grid gap-12 md:grid-cols-2 md:items-start">
          {/* Left: heading + info */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-purple/30 bg-accent-purple/10 px-4 py-1.5 text-sm text-accent-purple">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" />
              Let&apos;s talk
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Get in Touch
            </h2>
            <p className="mb-8 max-w-sm text-gray-400 leading-relaxed">
              Have a project in mind? Ready to get your website built? Or just
              want to know more — we&apos;re here and happy to help.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <svg className="h-4 w-4 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>support@webconcoction.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <svg className="h-4 w-4 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>We typically respond within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <ContactForm />
        </div>

        {/* Divider */}
        <div className="mb-12 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Footer links */}
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue">
                <svg fill="white" className="h-5 w-5" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26,19.72a10,10,0,0,0-6-8.88V8h1a1,1,0,0,0,0-2H11a1,1,0,0,0,0,2h1v2.84a10,10,0,0,0-5.84,7.44A9,9,0,0,0,6,20a2.62,2.62,0,0,0,0,.28,10,10,0,0,0,19.84,1.44A9.74,9.74,0,0,0,26,20,2.62,2.62,0,0,0,26,19.72Zm-2.16,1.93A8,8,0,0,1,8,20.36c0-.12,0-.24,0-.36a7.43,7.43,0,0,1,.18-1.64,8,8,0,0,1,5.15-5.89,1,1,0,0,0,.67-1V8h4v3.52a1,1,0,0,0,.67,1A8,8,0,0,1,24,19.64,2.17,2.17,0,0,1,24,20,8.17,8.17,0,0,1,23.83,21.65Z"/>
                  <path d="M22,20a6,6,0,0,1-12,0,5.29,5.29,0,0,1,.1-1.06l.33.16a5.12,5.12,0,0,0,2.57.62,5.12,5.12,0,0,0,2.57-.62A6.84,6.84,0,0,1,19,18.28a6.75,6.75,0,0,1,2.89.57A6.23,6.23,0,0,1,22,20Z"/>
                  <path d="M8,8a.76.76,0,0,1-.75.75,1.51,1.51,0,0,0-1.5,1.5.75.75,0,0,1-1.5,0,1.5,1.5,0,0,0-1.5-1.5.75.75,0,0,1,0-1.5,1.5,1.5,0,0,0,1.5-1.5.75.75,0,0,1,1.5,0,1.51,1.51,0,0,0,1.5,1.5A.76.76,0,0,1,8,8Z"/>
                  <path d="M30,5a.76.76,0,0,1-.75.75,1.51,1.51,0,0,0-1.5,1.5.75.75,0,0,1-1.5,0,1.5,1.5,0,0,0-1.5-1.5.75.75,0,0,1,0-1.5,1.5,1.5,0,0,0,1.5-1.5.75.75,0,0,1,1.5,0,1.51,1.51,0,0,0,1.5,1.5A.76.76,0,0,1,30,5Z"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white">WebConcoction</span>
            </div>
            <p className="text-sm text-gray-500">
              Custom websites, premium domains, and enterprise hosting — crafted to perfection.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Products</h4>
            <ul className="space-y-2">
              <li><a href="#domains" className="text-sm text-gray-500 transition-colors hover:text-white">Domain Search</a></li>
              <li><a href="#pricing" className="text-sm text-gray-500 transition-colors hover:text-white">Web Hosting</a></li>
              <li><a href="#features" className="text-sm text-gray-500 transition-colors hover:text-white">SSL Certificates</a></li>
              <li><a href="#contact" className="text-sm text-gray-500 transition-colors hover:text-white">Custom Websites</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-500 transition-colors hover:text-white">About</a></li>
              <li><a href="#contact" className="text-sm text-gray-500 transition-colors hover:text-white">Contact</a></li>
              <li><a href="/login" className="text-sm text-gray-500 transition-colors hover:text-white">Client Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-sm text-gray-500 transition-colors hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-sm text-gray-500 transition-colors hover:text-white">Terms of Service</a></li>
              <li><a href="/cookies" className="text-sm text-gray-500 transition-colors hover:text-white">Cookie Policy</a></li>
              <li><a href="/sla" className="text-sm text-gray-500 transition-colors hover:text-white">SLA</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} WebConcoction LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
