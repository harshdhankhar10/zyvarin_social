import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Zyvarin Social',
  description: 'Learn how Zyvarin Social collects, uses, and protects your personal data',
  openGraph: {
    title: 'Privacy Policy - Zyvarin Social',
    description: 'Our comprehensive privacy policy',
  }
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-lg text-slate-600">Last updated: December 8, 2025</p>
      </div>

      <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Introduction</h2>
          <p>
            Zyvarin Social ("Company," "we," "us," "our," or "Platform") operates the Zyvarin.com website and mobile applications (collectively, the "Service"). 
            This Privacy Policy explains how we collect, use, disclose, and otherwise process personal information in connection with our Service, and the rights and choices available to you regarding your information.
          </p>
          <p>
            We are committed to protecting your privacy and ensuring you have a positive experience on our platform. Please read this Privacy Policy carefully and contact us if you have any questions.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">2.1 Account Registration Information</h3>
          <p>When you create a Zyvarin account, we collect:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Email address</li>
            <li>Full name</li>
            <li>Password (hashed using bcrypt, never stored in plain text)</li>
            <li>Timezone and language preferences</li>
            <li>Profile avatar and bio</li>
            <li>Company name and website (optional)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.2 Social Media Credentials</h3>
          <p>
            To enable post publishing, we collect OAuth 2.0 tokens from connected platforms:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>LinkedIn API tokens (encrypted at rest)</li>
            <li>Twitter/X API tokens (encrypted at rest)</li>
            <li>Dev.to API keys (encrypted at rest)</li>
          </ul>
          <p className="text-sm text-slate-600 mt-2">
            <strong>Important:</strong> We never store your social media passwords. We only store OAuth tokens required to post on your behalf. These tokens are encrypted using AES-256 encryption.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.3 Payment Information</h3>
          <p>
            For paid subscription plans, payment is processed through Razorpay, a PCI-DSS Level 1 compliant payment processor. We do not store full credit card details. We collect:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Last 4 digits of card (for reference)</li>
            <li>Card brand (Visa, Mastercard, etc.)</li>
            <li>Billing address</li>
            <li>Transaction history and invoice records</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.4 Content Information</h3>
          <p>We collect and store:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Post content (text, images, media URLs)</li>
            <li>Scheduled publishing times</li>
            <li>Post status and performance metrics</li>
            <li>Draft posts and templates</li>
            <li>Media files uploaded (images, videos)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.5 Usage Data</h3>
          <p>
            We automatically collect information about how you interact with our Service:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Device information (IP address, browser type, OS)</li>
            <li>Pages visited and time spent</li>
            <li>Click patterns and feature usage</li>
            <li>Login times and frequency</li>
            <li>Error logs and crash reports</li>
            <li>Referral source (where you came from)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.6 Cookies and Tracking Technologies</h3>
          <p>
            We use cookies, web beacons, and similar tracking technologies to enhance your experience:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Session Cookies:</strong> NextAuth.js authentication tokens (httpOnly, Secure flags)</li>
            <li><strong>Analytics Cookies:</strong> Google Analytics for usage insights</li>
            <li><strong>Preference Cookies:</strong> Remember your theme and language preferences</li>
            <li><strong>Third-party Cookies:</strong> From Razorpay (payment processing)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
          <p>We use collected information for:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Providing and maintaining the Service</li>
            <li>Processing subscriptions and payments</li>
            <li>Publishing posts to your connected social media accounts</li>
            <li>Generating AI-powered content suggestions</li>
            <li>Tracking analytics and engagement metrics</li>
            <li>Sending service updates and notifications</li>
            <li>Resolving disputes and providing customer support</li>
            <li>Detecting and preventing fraud and abuse</li>
            <li>Complying with legal obligations</li>
            <li>Improving our Service through analysis and testing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Data Security</h2>
          <p>
            We implement comprehensive security measures to protect your data:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Encryption:</strong> All sensitive data encrypted with AES-256 at rest</li>
            <li><strong>HTTPS:</strong> All data in transit protected with TLS 1.3</li>
            <li><strong>OAuth 2.0:</strong> Social media authentication without storing passwords</li>
            <li><strong>Database Security:</strong> PostgreSQL with role-based access control</li>
            <li><strong>Regular Audits:</strong> Monthly security assessments</li>
            <li><strong>SOC 2 Type II:</strong> Compliant with SOC 2 standards</li>
            <li><strong>Access Control:</strong> Principle of least privilege for employee access</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            While we implement strong security measures, no system is completely immune to breaches. We maintain cyber liability insurance and a responsible disclosure program.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Data Retention</h2>
          <p>
            We retain your information for as long as necessary to provide the Service and comply with legal obligations:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Active Accounts:</strong> Data retained while account is active</li>
            <li><strong>Deleted Accounts:</strong> Data deleted within 30 days of account deletion</li>
            <li><strong>Backups:</strong> Backups retained for 90 days for disaster recovery</li>
            <li><strong>Payment Records:</strong> Retained for 7 years (tax compliance)</li>
            <li><strong>OAuth Tokens:</strong> Deleted immediately upon account deletion or platform disconnection</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Data Sharing & Disclosure</h2>
          <p>
            We do not sell your personal data. We only share data when:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Social Media Platforms:</strong> We share posts/content you authorize to LinkedIn, Twitter, Dev.to</li>
            <li><strong>Payment Processor:</strong> Razorpay processes payments and securely stores billing information</li>
            <li><strong>AI Services:</strong> Google Gemini API for content suggestions (anonymized prompts)</li>
            <li><strong>Analytics:</strong> Google Analytics (anonymized usage data)</li>
            <li><strong>Legal Requirements:</strong> Law enforcement requests (with proper legal process)</li>
            <li><strong>Service Providers:</strong> Email (Nodemailer), hosting (Vercel)</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            We do not allow third parties to use your data for their own marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Your Privacy Rights</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">7.1 GDPR Rights (EU Users)</h3>
          <p>If you are an EU resident, you have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Correct inaccurate information</li>
            <li><strong>Erasure:</strong> Request deletion ("right to be forgotten")</li>
            <li><strong>Data Portability:</strong> Export your data in machine-readable format</li>
            <li><strong>Restrict Processing:</strong> Limit how we use your data</li>
            <li><strong>Object:</strong> Opt-out of specific processing activities</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">7.2 CCPA Rights (California Users)</h3>
          <p>If you are a California resident, you have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Know what personal information we collect</li>
            <li>Know whether your personal information is sold or disclosed</li>
            <li>Opt-out of the sale or sharing of your personal information</li>
            <li>Access your personal information</li>
            <li>Request deletion of personal information</li>
            <li>Correct inaccurate information</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">7.3 Exercising Your Rights</h3>
          <p>
            To exercise any of these rights, contact us at <strong>privacy@zyvarin.com</strong> with the subject line "Data Request." 
            Include your name, email, and specific request. We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites and services not operated by Zyvarin. This Privacy Policy does not apply to third-party services, 
            and we are not responsible for their privacy practices. Please review their privacy policies before providing any information.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">9. Children's Privacy</h2>
          <p>
            Zyvarin is not intended for users under 18 years old. We do not knowingly collect personal information from children under 18. 
            If we learn that we have collected personal information from a child under 18, we will delete it promptly. 
            If you believe we have collected information from a child, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">10. Policy Changes</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. 
            We will notify you of material changes by updating the "Last Updated" date at the top of this policy. 
            Your continued use of the Service constitutes acceptance of the updated Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className="bg-slate-50 p-6 rounded-lg mt-4">
            <p><strong>Zyvarin Social Inc.</strong></p>
            <p>Email: <a href="mailto:privacy@zyvarin.com" className="text-indigo-600 hover:underline">privacy@zyvarin.com</a></p>
            <p>Support: <a href="https://zyvarin.com/support" className="text-indigo-600 hover:underline">zyvarin.com/support</a></p>
            <p>Data Protection Officer: <a href="mailto:dpo@zyvarin.com" className="text-indigo-600 hover:underline">dpo@zyvarin.com</a></p>
          </div>
        </section>
      </div>
    </div>
  )
}
