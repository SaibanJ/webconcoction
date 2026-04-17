import LegalLayout from '../components/LegalLayout'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How WebConcoction collects, uses, and protects your personal information.',
  alternates: { canonical: 'https://webconcoction.com/privacy' },
}

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information when you use WebConcoction services."
      lastUpdated="April 16, 2026"
      sections={[
        {
          heading: '1. Who We Are',
          body: (
            <>
              <p>WebConcoction LLC (&ldquo;WebConcoction&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is a web design, hosting, and domain registration company. We build and host custom websites for businesses and individuals.</p>
              <p>If you have any questions about this Privacy Policy, you can contact us at <a href="mailto:support@webconcoction.com" className="text-accent-purple hover:text-white transition-colors">support@webconcoction.com</a>.</p>
            </>
          ),
        },
        {
          heading: '2. Information We Collect',
          body: (
            <>
              <p><span className="text-white font-medium">Account & Contact Information:</span> When you contact us or purchase a plan, we collect your name, email address, and any message content you provide.</p>
              <p><span className="text-white font-medium">Payment Information:</span> All payment processing is handled by Stripe. We do not store your credit card details. Stripe may collect billing name, card number, expiry, and billing address. See <a href="https://stripe.com/privacy" className="text-accent-purple hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a>.</p>
              <p><span className="text-white font-medium">Domain Registration Data:</span> When registering a domain, we collect registrant contact information (name, address, phone, email) as required by ICANN regulations. This data is passed to Namecheap to complete the registration.</p>
              <p><span className="text-white font-medium">Hosting Account Data:</span> For hosting accounts, we collect your desired domain, cPanel username, and email address to provision your hosting environment.</p>
              <p><span className="text-white font-medium">Usage Data:</span> We use Sentry to collect error and performance data to improve our platform. This may include IP address, browser type, and pages visited.</p>
            </>
          ),
        },
        {
          heading: '3. How We Use Your Information',
          body: (
            <>
              <p>We use the information we collect to:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Provision and manage your hosting account and domain registrations</li>
                <li>Process payments and send billing-related communications</li>
                <li>Respond to your support requests and contact form submissions</li>
                <li>Send service-related notifications (account setup, renewal reminders)</li>
                <li>Monitor platform health and debug technical issues</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
            </>
          ),
        },
        {
          heading: '4. Third-Party Services',
          body: (
            <>
              <p>We share data with the following third parties only to the extent necessary to provide our services:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li><span className="text-white font-medium">Stripe</span> — payment processing</li>
                <li><span className="text-white font-medium">Namecheap</span> — domain registration and DNS management</li>
                <li><span className="text-white font-medium">Supabase</span> — secure database storage for account data</li>
                <li><span className="text-white font-medium">Resend</span> — transactional email delivery</li>
                <li><span className="text-white font-medium">Sentry</span> — error monitoring and performance tracking</li>
              </ul>
              <p>Each provider operates under their own privacy policy and data processing agreements.</p>
            </>
          ),
        },
        {
          heading: '5. Data Retention',
          body: (
            <>
              <p>We retain your personal data for as long as your account is active or as needed to provide services. If you cancel your hosting plan, we retain billing records for up to 7 years as required by financial regulations.</p>
              <p>Error logs and usage data are retained for up to 90 days. Domain registrant data is retained for the duration of the registration and any renewal periods.</p>
            </>
          ),
        },
        {
          heading: '6. Data Security',
          body: (
            <>
              <p>We implement industry-standard security measures including encrypted connections (HTTPS/TLS), access controls, and secure credential storage. Sensitive credentials are stored as environment variables and never committed to version control.</p>
              <p>Despite our efforts, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.</p>
            </>
          ),
        },
        {
          heading: '7. Your Rights',
          body: (
            <>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal retention requirements)</li>
                <li>Opt out of non-essential communications</li>
              </ul>
              <p>To exercise any of these rights, contact us at <a href="mailto:support@webconcoction.com" className="text-accent-purple hover:text-white transition-colors">support@webconcoction.com</a>.</p>
            </>
          ),
        },
        {
          heading: '8. Changes to This Policy',
          body: (
            <p>We may update this Privacy Policy from time to time. We will notify active customers of significant changes via email. Continued use of our services after changes are posted constitutes acceptance of the updated policy.</p>
          ),
        },
      ]}
    />
  )
}
