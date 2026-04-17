import LegalLayout from '../components/LegalLayout'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using WebConcoction services.',
  alternates: { canonical: 'https://webconcoction.com/terms' },
}

export default function TermsOfService() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before purchasing or using any WebConcoction service."
      lastUpdated="April 16, 2026"
      sections={[
        {
          heading: '1. Agreement',
          body: (
            <p>By purchasing a hosting plan, registering a domain, or using any service provided by WebConcoction LLC (&ldquo;WebConcoction&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>
          ),
        },
        {
          heading: '2. Services',
          body: (
            <>
              <p>WebConcoction provides the following services:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li><span className="text-white font-medium">Website Design & Development:</span> Custom-built websites included as part of a hosting plan setup fee. Work begins after setup fee payment is confirmed.</li>
                <li><span className="text-white font-medium">Web Hosting:</span> Managed cPanel hosting with allocated storage, bandwidth, email accounts, and databases as specified in your chosen plan.</li>
                <li><span className="text-white font-medium">Domain Registration:</span> One-year domain registrations processed through Namecheap. Domain availability and pricing are subject to change.</li>
              </ul>
              <p>We reserve the right to modify or discontinue any service with reasonable notice to affected customers.</p>
            </>
          ),
        },
        {
          heading: '3. Payment Terms',
          body: (
            <>
              <p><span className="text-white font-medium">Hosting Plans:</span> All hosting plans require a one-time setup fee charged at the time of purchase, plus the first month of hosting. Subsequent monthly billing is charged automatically to the saved payment method on your monthly anniversary date.</p>
              <p><span className="text-white font-medium">Domain Registration:</span> Domain fees are charged as a one-time payment per registration period (one year). Renewal fees apply at the prevailing rate.</p>
              <p><span className="text-white font-medium">Failed Payments:</span> If a recurring payment fails, we will retry up to three times over seven days. If payment cannot be collected, your hosting account may be suspended until the balance is resolved.</p>
              <p>All prices are in USD. Applicable taxes may apply depending on your jurisdiction.</p>
            </>
          ),
        },
        {
          heading: '4. Refund Policy',
          body: (
            <>
              <p><span className="text-white font-medium">Setup Fees:</span> Setup fees are non-refundable once website design or development work has commenced. If you cancel before work begins, a full refund may be issued at our discretion.</p>
              <p><span className="text-white font-medium">Monthly Hosting:</span> Monthly hosting fees are non-refundable for the current billing period. You may cancel at any time and service will continue through the end of the paid period.</p>
              <p><span className="text-white font-medium">Domain Registrations:</span> Domain registration fees are non-refundable once the domain has been registered with the registry.</p>
              <p>To request a refund or discuss your situation, contact <a href="mailto:support@webconcoction.com" className="text-accent-purple hover:text-white transition-colors">support@webconcoction.com</a>.</p>
            </>
          ),
        },
        {
          heading: '5. Acceptable Use',
          body: (
            <>
              <p>You agree not to use our hosting services for:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>Distributing malware, viruses, or malicious code</li>
                <li>Sending unsolicited bulk email (spam)</li>
                <li>Hosting content that is illegal under applicable law</li>
                <li>Conducting distributed denial-of-service (DDoS) attacks</li>
                <li>Mining cryptocurrency</li>
                <li>Storing or distributing copyrighted material without authorization</li>
                <li>Any activity that degrades server performance for other users</li>
              </ul>
              <p>Violation of this policy may result in immediate account suspension without refund.</p>
            </>
          ),
        },
        {
          heading: '6. Intellectual Property',
          body: (
            <>
              <p><span className="text-white font-medium">Your Content:</span> You retain ownership of all content you provide or that we create specifically for your website. Upon full payment of the setup fee, all website code and design assets belong to you.</p>
              <p><span className="text-white font-medium">Our Platform:</span> The WebConcoction platform, dashboard, and proprietary tools remain the intellectual property of WebConcoction LLC.</p>
            </>
          ),
        },
        {
          heading: '7. Limitation of Liability',
          body: (
            <>
              <p>WebConcoction&apos;s total liability for any claim arising under these terms shall not exceed the amount you paid for the service in the three months preceding the claim.</p>
              <p>We are not liable for indirect, incidental, consequential, or punitive damages including lost profits, loss of data, or business interruption, even if we have been advised of the possibility of such damages.</p>
            </>
          ),
        },
        {
          heading: '8. Termination',
          body: (
            <>
              <p><span className="text-white font-medium">By You:</span> You may cancel your hosting subscription at any time by contacting support. Cancellation takes effect at the end of the current billing period.</p>
              <p><span className="text-white font-medium">By Us:</span> We may terminate or suspend your account immediately for violations of these terms, non-payment, or any activity that poses a risk to our infrastructure or other customers.</p>
              <p>Upon termination, you have 30 days to request a copy of your website files. After that period, data may be permanently deleted.</p>
            </>
          ),
        },
        {
          heading: '9. Governing Law',
          body: (
            <p>These Terms of Service are governed by the laws of the United States. Any disputes shall be resolved in the applicable courts. If any provision of these terms is found to be unenforceable, the remaining provisions remain in full effect.</p>
          ),
        },
        {
          heading: '10. Contact',
          body: (
            <p>Questions about these terms? Reach us at <a href="mailto:support@webconcoction.com" className="text-accent-purple hover:text-white transition-colors">support@webconcoction.com</a>.</p>
          ),
        },
      ]}
    />
  )
}
