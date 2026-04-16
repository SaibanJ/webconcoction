import LegalLayout from '../components/LegalLayout'

export const metadata = {
  title: 'Cookie Policy | WebConcoction',
  description: 'Information about how WebConcoction uses cookies.',
}

export default function CookiePolicy() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="A straightforward explanation of the cookies we use and why."
      lastUpdated="April 16, 2026"
      sections={[
        {
          heading: '1. What Are Cookies',
          body: (
            <p>Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit, such as whether you are logged in. We keep our cookie use minimal and purposeful.</p>
          ),
        },
        {
          heading: '2. Cookies We Use',
          body: (
            <>
              <p><span className="text-white font-medium">Essential Cookies (Required)</span></p>
              <p>These cookies are necessary for the site to function and cannot be disabled:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li><span className="text-white">sb-auth-token</span> — Supabase authentication session. Set when you log in to your client dashboard. Expires when you log out or the session times out.</li>
                <li><span className="text-white">__stripe_mid / __stripe_sid</span> — Set by Stripe during the checkout process for fraud prevention. Cleared after checkout.</li>
              </ul>

              <p className="mt-4"><span className="text-white font-medium">Functional Cookies (Optional)</span></p>
              <p>These improve your experience but are not strictly required:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li><span className="text-white">sentry-sc</span> — Set by Sentry for session replay and error correlation. Helps us diagnose bugs that affect users. No personally identifiable data is captured.</li>
              </ul>

              <p className="mt-4"><span className="text-white font-medium">What We Do Not Use</span></p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Advertising or tracking cookies</li>
                <li>Third-party marketing pixels</li>
                <li>Social media tracking cookies</li>
                <li>Analytics platforms like Google Analytics</li>
              </ul>
            </>
          ),
        },
        {
          heading: '3. Managing Cookies',
          body: (
            <>
              <p>You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that blocking essential cookies will prevent you from logging into your client dashboard.</p>
              <p>Common browser cookie settings:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li><span className="text-white">Chrome:</span> Settings → Privacy and Security → Cookies</li>
                <li><span className="text-white">Safari:</span> Preferences → Privacy</li>
                <li><span className="text-white">Firefox:</span> Settings → Privacy & Security</li>
              </ul>
            </>
          ),
        },
        {
          heading: '4. Updates',
          body: (
            <p>If we add new cookies or change how we use existing ones, we will update this page. We will not introduce advertising or third-party tracking cookies without updating this policy and notifying users.</p>
          ),
        },
        {
          heading: '5. Contact',
          body: (
            <p>Questions? Email us at <a href="mailto:support@webconcoction.com" className="text-accent-purple hover:text-white transition-colors">support@webconcoction.com</a>.</p>
          ),
        },
      ]}
    />
  )
}
