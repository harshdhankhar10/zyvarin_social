import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy - Zyvarin Social',
  description: 'Review our Acceptable Use Policy for guidelines on using Zyvarin Social'
}

export default function AcceptableUsePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">Acceptable Use Policy</h1>
        <p className="text-lg text-slate-600">Last updated: December 8, 2025</p>
      </div>

      <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Purpose</h2>
          <p>
            This Acceptable Use Policy ("AUP") outlines prohibited uses of Zyvarin Social services. 
            The purpose is to ensure a safe, secure, and abuse-free environment for all users. 
            Violation of this policy may result in account suspension or termination.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Prohibited Content & Activities</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">2.1 Illegal Content</h3>
          <p>You agree not to use Zyvarin for:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Distributing, promoting, or possessing illegal materials or information</li>
            <li>Publishing content that violates local, state, or federal laws</li>
            <li>Facilitating or promoting illegal activities (gambling, drugs, weapons, etc.)</li>
            <li>Content related to terrorism, extremism, or violence</li>
            <li>Child exploitation, sexual abuse, or non-consensual intimate images</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.2 Harassment & Abuse</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Harass, threaten, intimidate, or bully other individuals</li>
            <li>Post content targeting individuals based on protected characteristics (race, gender, religion, disability, etc.)</li>
            <li>Engage in cyberstalking, doxxing, or privacy violations</li>
            <li>Coordinate harassment campaigns or hate speech</li>
            <li>Send unsolicited messages that are aggressive or threatening</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.3 Impersonation & Fraud</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Impersonate individuals, organizations, or public figures</li>
            <li>Misrepresent your identity or affiliation</li>
            <li>Create fraudulent accounts or fake profiles</li>
            <li>Engage in phishing, scams, or social engineering</li>
            <li>Misuse credentials or access tokens of other users</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.4 Intellectual Property Violations</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Post content that infringes copyrights, trademarks, or patents</li>
            <li>Plagiarize or reproduce others' work without attribution</li>
            <li>Violate trade secret or confidential information protections</li>
            <li>Infringe on right of publicity or privacy</li>
            <li>Use Zyvarin tools to generate counterfeit or forged content</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.5 Spam & Unwanted Communications</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Use Zyvarin to send spam, mass unsolicited messages, or bulk email</li>
            <li>Engage in "cookie stuffing" or inauthentic promotion</li>
            <li>Publish misleading links or malware distribution</li>
            <li>Create multiple accounts to evade moderation</li>
            <li>Engage in multi-level marketing (MLM) schemes or pyramid schemes</li>
            <li>Auto-post content at excessive frequencies</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.6 Misinformation & Disinformation</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Deliberately publish false or misleading information presented as fact</li>
            <li>Spread health misinformation (vaccine lies, dangerous medical advice, etc.)</li>
            <li>Coordinate inauthentic behavior to amplify false narratives</li>
            <li>Use deepfakes or manipulated media without clear labeling</li>
            <li>Publish election disinformation or voter suppression content</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.7 Malware & Security Threats</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Distribute viruses, worms, malware, trojans, or ransomware</li>
            <li>Attempt to gain unauthorized access to systems or accounts</li>
            <li>Exploit security vulnerabilities or conduct denial-of-service attacks</li>
            <li>Reverse engineer, decompile, or disassemble Zyvarin software</li>
            <li>Perform SQL injection, cross-site scripting (XSS), or other attacks</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.8 API Abuse</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Make excessive API requests that disrupt service for others</li>
            <li>Scrape, crawl, or collect user data without authorization</li>
            <li>Circumvent rate limits through proxy requests or account multiplication</li>
            <li>Use our API for purposes other than those authorized</li>
            <li>Reverse engineer API functionality or documentation</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.9 Adult & Sexually Explicit Content</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Post pornographic, sexually explicit, or adult content</li>
            <li>Share non-consensual intimate images ("revenge porn")</li>
            <li>Engage in solicitation of sexual services or prostitution</li>
            <li>Post content sexualizing minors (strictly prohibited)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.10 Violent Content</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Post graphic violence, gore, or self-harm content</li>
            <li>Glorify or encourage violence against individuals or groups</li>
            <li>Share graphic animal abuse or cruelty</li>
            <li>Coordinate real-world violence or attacks</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.11 Substance Abuse</h3>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Promote illegal drug use or distribution</li>
            <li>Provide instructions for drug manufacturing or consumption</li>
            <li>Sell or facilitate purchase of controlled substances</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Platform-Specific Violations</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">3.1 Social Media Terms Compliance</h3>
          <p>
            You agree to comply with the terms of service and community guidelines of all connected platforms:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>LinkedIn:</strong> LinkedIn Professional Community Guidelines</li>
            <li><strong>Twitter/X:</strong> Twitter Rules and Twitter's Developer Terms & Policy</li>
            <li><strong>Dev.to:</strong> Dev.to Community Code of Conduct</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Violations of platform terms may result in removal of your post and restrictions on your account with that platform.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">3.2 Authentic Identity Requirements</h3>
          <p>
            For LinkedIn and other professional platforms, you agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Use your authentic name or approved business entity name</li>
            <li>Accurately represent your professional identity</li>
            <li>Not create fake profiles or impersonate professionals</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">3.3 Engagement Authenticity</h3>
          <p>
            You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Buy or sell followers, likes, comments, or engagement</li>
            <li>Use bots to artificially inflate engagement metrics</li>
            <li>Coordinate inauthentic engagement ("click farms")</li>
            <li>Manipulate algorithms through coordinated behavior</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Enforcement & Consequences</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">4.1 Warning System</h3>
          <p>
            For minor violations, we may issue a warning. Users receive written notice of the violation 
            and have 7 days to cure the violation. Continued violations may result in suspension.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">4.2 Temporary Suspension</h3>
          <p>
            For serious or repeated violations, we may suspend your account for 7-90 days. During suspension:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>You cannot access your account</li>
            <li>Scheduled posts will not be published</li>
            <li>You will not be charged for subscription fees</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">4.3 Permanent Termination</h3>
          <p>
            For severe violations (illegal content, repeat offenses, abuse), we may permanently terminate your account. 
            Upon termination:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Your account and all data will be deleted</li>
            <li>You will lose access to all Zyvarin services</li>
            <li>You may be banned from creating new accounts</li>
            <li>Your email may be added to our blocklist</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">4.4 Immediate Termination Without Warning</h3>
          <p>
            We may immediately terminate accounts for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Child exploitation, sexual abuse material, or CSAM</li>
            <li>Coordination of violence or terrorist activity</li>
            <li>Repeated, severe harassment or threats</li>
            <li>Identity theft or account credential theft</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Content Moderation Process</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">5.1 Reporting Violations</h3>
          <p>
            If you encounter content or behavior that violates this policy, please report it:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Through the in-app report function (flag icon on posts)</li>
            <li>By emailing <a href="mailto:abuse@zyvarin.com" className="text-indigo-600 hover:underline">abuse@zyvarin.com</a></li>
            <li>Via our support form at zyvarin.com/report</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">5.2 Investigation Timeline</h3>
          <p>
            We investigate all reports and respond within:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>24 hours for illegal content or serious violations</li>
            <li>3-5 business days for other violations</li>
            <li>7-10 business days for appeals</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">5.3 Appeals Process</h3>
          <p>
            If your account is suspended or terminated, you may appeal within 30 days by:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Contacting us at <a href="mailto:appeals@zyvarin.com" className="text-indigo-600 hover:underline">appeals@zyvarin.com</a></li>
            <li>Providing context or evidence why the action was in error</li>
            <li>Our appeals team will review and respond within 10 business days</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Legal Compliance</h2>
          <p>
            We cooperate with law enforcement and may disclose user information when required by:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Valid government subpoena or court order</li>
            <li>Laws protecting children from exploitation</li>
            <li>Terrorism prevention statutes</li>
            <li>Public safety emergencies</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            We will notify users of legal requests whenever permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Safe Harbor Provisions</h2>
          <p>
            We are not liable for user-generated content or violations committed by users. 
            However, we take reasonable steps to detect and remove prohibited content.
          </p>
          <p className="text-sm text-slate-600 mt-4">
            <strong>DMCA Notice:</strong> If you believe content infringes your copyrights, 
            please submit a DMCA takedown notice to <a href="mailto:dmca@zyvarin.com" className="text-indigo-600 hover:underline">dmca@zyvarin.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Policy Updates</h2>
          <p>
            Zyvarin may update this Acceptable Use Policy at any time. Material changes will be announced 
            with 30 days' notice. Continued use of the Platform constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">9. Contact & Support</h2>
          <div className="bg-slate-50 p-6 rounded-lg mt-4">
            <p><strong>Questions about this policy?</strong></p>
            <p>Email: <a href="mailto:legal@zyvarin.com" className="text-indigo-600 hover:underline">legal@zyvarin.com</a></p>
            <p>Report Abuse: <a href="mailto:abuse@zyvarin.com" className="text-indigo-600 hover:underline">abuse@zyvarin.com</a></p>
            <p>Appeal Decisions: <a href="mailto:appeals@zyvarin.com" className="text-indigo-600 hover:underline">appeals@zyvarin.com</a></p>
          </div>
        </section>
      </div>
    </div>
  )
}
