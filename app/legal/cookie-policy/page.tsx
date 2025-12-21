import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy - Zyvarin Social',
  description: 'Learn about how Zyvarin Social uses cookies and similar tracking technologies'
}

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
        <p className="text-lg text-slate-600">Last updated: December 8, 2025</p>
      </div>

      <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">1. What Are Cookies?</h2>
          <p>
            Cookies are small data files stored on your device when you visit a website. They help websites remember information about you, 
            such as your login status, preferences, and activity history. Cookies are widely used to enhance user experience and are an important 
            technology for website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Types of Cookies We Use</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">2.1 Session Cookies (Essential)</h3>
          <p>
            <strong>Purpose:</strong> Maintain user login sessions and authentication
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Cookie Name: <code className="bg-slate-100 px-2 py-1 rounded">next-auth.session-token</code></li>
            <li>Duration: Session (expires when browser closes)</li>
            <li>Security: HttpOnly, Secure, SameSite=Lax flags enabled</li>
            <li>Purpose: Authenticates you as a logged-in user</li>
            <li>Persistence: NOT stored on your device after logout</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.2 Preference Cookies (Functional)</h3>
          <p>
            <strong>Purpose:</strong> Remember your preferences and settings
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Theme Preference: Light/Dark mode selection</li>
            <li>Language: Your preferred language</li>
            <li>Timezone: Your timezone settings</li>
            <li>Duration: 1 year</li>
            <li>Purpose: Provide personalized experience</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.3 Analytics Cookies (Performance)</h3>
          <p>
            <strong>Purpose:</strong> Understand how users interact with our platform
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Service: Google Analytics 4</li>
            <li>Cookies: <code className="bg-slate-100 px-2 py-1 rounded">_ga</code>, <code className="bg-slate-100 px-2 py-1 rounded">_gid</code></li>
            <li>Duration: 2 years</li>
            <li>Data Collected: Pages visited, time on page, user flow, device info</li>
            <li>Anonymization: IP addresses anonymized, no PII collected</li>
            <li>Purpose: Improve user experience and platform performance</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.4 Marketing/Advertising Cookies (Marketing)</h3>
          <p>
            <strong>Purpose:</strong> Show relevant content and measure campaign effectiveness
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Services: Google Ads, LinkedIn Insight Tag (if applicable)</li>
            <li>Purpose: Retarget users with relevant ads across the web</li>
            <li>Duration: 6-24 months depending on platform</li>
            <li>Opt-out: Available through individual platform settings</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.5 Third-Party Service Cookies</h3>
          <p>
            <strong>Purpose:</strong> Enable integration with third-party services
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Razorpay (Payment):</strong> Processes payment transactions securely</li>
            <li><strong>Google Gemini (AI):</strong> Powers content suggestion features</li>
            <li><strong>LinkedIn API:</strong> Enables account connection and posting</li>
            <li><strong>Twitter API:</strong> Enables account connection and posting</li>
            <li><strong>Dev.to API:</strong> Enables account connection and posting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Cookie Preferences & Control</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">3.1 How to Manage Cookies</h3>
          <p>
            You can control cookies through your browser settings:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
            <li><strong>Edge:</strong> Settings → Privacy, search, and services → Clear browsing data</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">3.2 Essential vs. Non-Essential Cookies</h3>
          <p>
            <strong>Essential Cookies</strong> (session cookies) are required for the Platform to function. 
            Disabling these will prevent you from logging in and using the service.
          </p>
          <p className="mt-4">
            <strong>Non-Essential Cookies</strong> (analytics, preferences, marketing) enhance your experience but are not required. 
            You can opt-out of these cookies using the cookie preference center or browser settings.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">3.3 Do Not Track (DNT)</h3>
          <p>
            Some browsers include a "Do Not Track" feature. We respect your DNT preferences and do not use analytics cookies 
            if you have DNT enabled in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Pixel Tags & Tracking Technologies</h2>
          <p>
            In addition to cookies, we use pixel tags (also called web beacons or tracking pixels) to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Track email open rates in notification emails</li>
            <li>Measure the effectiveness of marketing campaigns</li>
            <li>Understand user behavior on the Platform</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Pixel tags are 1x1 transparent images that don't affect your browsing experience.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Local Storage & Session Storage</h2>
          <p>
            We use browser storage technologies to store user data locally on your device:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>localStorage:</strong> Draft posts, preferences, user settings (persists after session ends)</li>
            <li><strong>sessionStorage:</strong> Temporary data for current session (cleared when browser closes)</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            You can clear local storage through browser settings (Settings → Clear browsing data).
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Third-Party Cookies</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">6.1 Partner Services</h3>
          <p>
            The following third parties may set cookies when you use our Platform:
          </p>
          <div className="space-y-4 mt-4">
            <div className="bg-slate-50 p-4 rounded">
              <p><strong>Google Analytics</strong></p>
              <p className="text-sm text-slate-600">Analytics and user behavior tracking</p>
              <p className="text-sm"><a href="https://policies.google.com/privacy" className="text-indigo-600 hover:underline">Google Privacy Policy</a></p>
            </div>
            <div className="bg-slate-50 p-4 rounded">
              <p><strong>Razorpay</strong></p>
              <p className="text-sm text-slate-600">Payment processing</p>
              <p className="text-sm"><a href="https://razorpay.com/privacy" className="text-indigo-600 hover:underline">Razorpay Privacy Policy</a></p>
            </div>
            <div className="bg-slate-50 p-4 rounded">
              <p><strong>Google Ads</strong></p>
              <p className="text-sm text-slate-600">Remarketing and advertising</p>
              <p className="text-sm"><a href="https://policies.google.com/technologies/ads" className="text-indigo-600 hover:underline">Google Ads Help</a></p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">6.2 Opting Out</h3>
          <p>
            You can opt out of third-party cookies through:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><a href="https://myaccount.google.com/data-and-privacy" className="text-indigo-600 hover:underline">Google Ad Settings</a> - Control Google ads personalization</li>
            <li><a href="https://optout.networkadvertising.org" className="text-indigo-600 hover:underline">Network Advertising Initiative</a> - Opt out of behavioral advertising</li>
            <li><a href="https://www.youradchoices.com" className="text-indigo-600 hover:underline">Digital Advertising Alliance</a> - Manage ad preferences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Data Security with Cookies</h2>
          <p>
            We protect cookie data through multiple security measures:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>HTTPS:</strong> All cookies transmitted over encrypted TLS 1.3 connections</li>
            <li><strong>HttpOnly Flag:</strong> Session cookies cannot be accessed by JavaScript (prevents XSS attacks)</li>
            <li><strong>Secure Flag:</strong> Cookies only transmitted over HTTPS (prevents interception)</li>
            <li><strong>SameSite:</strong> Cookies protected against CSRF attacks</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Cookies & Privacy Regulation Compliance</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">8.1 GDPR Compliance (EU Users)</h3>
          <p>
            Under the General Data Protection Regulation (GDPR), we obtain your consent before using non-essential cookies. 
            You can withdraw your consent at any time by updating your cookie preferences.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">8.2 CCPA Compliance (California Users)</h3>
          <p>
            Under the California Consumer Privacy Act (CCPA), you have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Know what data is collected via cookies</li>
            <li>Opt-out of the sale/sharing of data from cookies</li>
            <li>Request deletion of cookie data</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Visit our <a href="/legal/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a> for more details on your rights.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">8.3 ePrivacy Directive (UK/EU)</h3>
          <p>
            We comply with the ePrivacy Directive by obtaining your consent before using cookies that store or gain access to information already stored on your device.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">9. Cookies on Mobile Applications</h2>
          <p>
            If you use the Zyvarin app on mobile devices, we use similar tracking technologies:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>App Session Tokens:</strong> Similar to cookies for persistent login</li>
            <li><strong>Local Storage:</strong> Device storage for preferences and draft content</li>
            <li><strong>Firebase Analytics:</strong> Anonymized usage analytics</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            You can control app permissions through your device settings (Settings → Apps → Zyvarin Social).
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">10. Cookie Duration Reference Table</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse border border-slate-300">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-300 p-3 text-left">Cookie Name</th>
                  <th className="border border-slate-300 p-3 text-left">Duration</th>
                  <th className="border border-slate-300 p-3 text-left">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-3">next-auth.session-token</td>
                  <td className="border border-slate-300 p-3">Session</td>
                  <td className="border border-slate-300 p-3">Authentication</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-3">theme-preference</td>
                  <td className="border border-slate-300 p-3">1 year</td>
                  <td className="border border-slate-300 p-3">Theme preference</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">_ga</td>
                  <td className="border border-slate-300 p-3">2 years</td>
                  <td className="border border-slate-300 p-3">Google Analytics</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-3">_gid</td>
                  <td className="border border-slate-300 p-3">24 hours</td>
                  <td className="border border-slate-300 p-3">Google Analytics session</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">11. Updates to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. 
            We will notify you of material changes by updating the "Last Updated" date at the top of this policy.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">12. Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us:
          </p>
          <div className="bg-slate-50 p-6 rounded-lg mt-4">
            <p><strong>Zyvarin Social Inc.</strong></p>
            <p>Email: <a href="mailto:privacy@zyvarin.com" className="text-indigo-600 hover:underline">privacy@zyvarin.com</a></p>
            <p>Support: <a href="https://zyvarin.com/support" className="text-indigo-600 hover:underline">zyvarin.com/support</a></p>
          </div>
        </section>
      </div>
    </div>
  )
}
