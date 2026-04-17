import LegalLayout from '../components/LegalLayout'

export const metadata = {
  title: 'Service Level Agreement',
  description: 'WebConcoction uptime guarantees, support response times, and service commitments.',
  alternates: { canonical: 'https://webconcoction.com/sla' },
}

export default function SLA() {
  return (
    <LegalLayout
      title="Service Level Agreement"
      subtitle="Our commitments to uptime, support response times, and service quality for all hosting plans."
      lastUpdated="April 16, 2026"
      sections={[
        {
          heading: '1. Scope',
          body: (
            <p>This Service Level Agreement (&ldquo;SLA&rdquo;) applies to all active WebConcoction hosting plans (Basic, Pro, and Business). It defines our uptime commitments, support response time targets, and the remedies available if we fall short.</p>
          ),
        },
        {
          heading: '2. Uptime Guarantee',
          body: (
            <>
              <p>WebConcoction guarantees <span className="text-white font-medium">99.9% monthly uptime</span> for all hosted websites. This equates to no more than approximately 43 minutes of unplanned downtime per month.</p>
              <p>Uptime is measured from our hosting infrastructure to the public internet. It does not include scheduled maintenance windows or downtime caused by factors outside our control (see Section 5).</p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-white">Monthly Uptime</th>
                      <th className="px-4 py-3 text-left text-white">Max Downtime</th>
                      <th className="px-4 py-3 text-left text-white">Credit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="px-4 py-3">99.9% – 100%</td>
                      <td className="px-4 py-3">43 min</td>
                      <td className="px-4 py-3">None</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">99.0% – 99.9%</td>
                      <td className="px-4 py-3">7.2 hrs</td>
                      <td className="px-4 py-3">10% of monthly fee</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">95.0% – 99.0%</td>
                      <td className="px-4 py-3">36 hrs</td>
                      <td className="px-4 py-3">25% of monthly fee</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Below 95%</td>
                      <td className="px-4 py-3">&gt;36 hrs</td>
                      <td className="px-4 py-3">50% of monthly fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ),
        },
        {
          heading: '3. Support Response Times',
          body: (
            <>
              <p>Support is available via email at <a href="mailto:support@webconcoction.com" className="text-accent-purple hover:text-white transition-colors">support@webconcoction.com</a> and through the contact form on our website. Response time targets vary by plan:</p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-white">Plan</th>
                      <th className="px-4 py-3 text-left text-white">Initial Response</th>
                      <th className="px-4 py-3 text-left text-white">Support Label</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="px-4 py-3">Basic</td>
                      <td className="px-4 py-3">Within 48 hours</td>
                      <td className="px-4 py-3">Standard</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Pro</td>
                      <td className="px-4 py-3">Within 24 hours</td>
                      <td className="px-4 py-3">Priority</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">Business</td>
                      <td className="px-4 py-3">Within 8 hours</td>
                      <td className="px-4 py-3">Dedicated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3">Response time targets apply during business hours (9 AM – 6 PM ET, Monday–Friday). We strive to respond outside these hours but cannot guarantee it.</p>
            </>
          ),
        },
        {
          heading: '4. Scheduled Maintenance',
          body: (
            <>
              <p>Scheduled maintenance (server updates, security patches, infrastructure upgrades) is performed during low-traffic windows:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Preferred window: <span className="text-white">Sundays, 2:00 AM – 4:00 AM ET</span></li>
                <li>We will notify affected customers at least 24 hours in advance for planned maintenance expected to exceed 15 minutes</li>
                <li>Emergency security patches may be applied without advance notice</li>
              </ul>
              <p>Scheduled maintenance windows do not count against uptime calculations.</p>
            </>
          ),
        },
        {
          heading: '5. Exclusions',
          body: (
            <>
              <p>This SLA does not apply to downtime caused by:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Your actions or configurations (e.g., broken code, misconfigured DNS)</li>
                <li>Third-party services outside our control (Stripe, Namecheap, Cloudflare)</li>
                <li>DDoS attacks or other malicious traffic directed at your site</li>
                <li>Force majeure events (natural disasters, power grid failures, etc.)</li>
                <li>Suspension of your account due to policy violations or non-payment</li>
                <li>Domain expiration or DNS misconfiguration on your end</li>
              </ul>
            </>
          ),
        },
        {
          heading: '6. Requesting Credits',
          body: (
            <>
              <p>To claim a service credit, contact <a href="mailto:support@webconcoction.com" className="text-accent-purple hover:text-white transition-colors">support@webconcoction.com</a> within 15 days of the incident with the following information:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Your account email address</li>
                <li>Date and approximate time of the downtime</li>
                <li>Description of the issue experienced</li>
              </ul>
              <p>Credits are applied to your next monthly invoice. They cannot be exchanged for cash. Maximum credits per month are capped at 50% of your monthly hosting fee.</p>
            </>
          ),
        },
        {
          heading: '7. Changes to This SLA',
          body: (
            <p>WebConcoction reserves the right to update this SLA. We will notify active customers via email at least 30 days before material changes take effect. Continued use of the service after that date constitutes acceptance of the revised SLA.</p>
          ),
        },
      ]}
    />
  )
}
