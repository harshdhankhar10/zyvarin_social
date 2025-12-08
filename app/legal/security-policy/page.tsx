import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security & Compliance Policy - Zyvarin Social',
  description: 'Learn about Zyvarin Social\'s security measures and compliance standards'
}

export default function SecurityPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">Security & Compliance Policy</h1>
        <p className="text-lg text-slate-600">Last updated: December 8, 2025</p>
      </div>

      <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Security Overview</h2>
          <p>
            Zyvarin Social is committed to maintaining the highest standards of data security and compliance. 
            We protect your information through multiple layers of technical, administrative, and physical security controls. 
            This policy outlines our security practices, compliance certifications, and incident response procedures.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Encryption & Data Protection</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">2.1 Encryption at Rest</h3>
          <p>
            All sensitive data stored in our systems is encrypted using AES-256 encryption:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Database Encryption:</strong> PostgreSQL with pgcrypto extension</li>
            <li><strong>Social Media Tokens:</strong> Encrypted with master key stored separately</li>
            <li><strong>Payment Data:</strong> Not stored locally; tokenized via Razorpay</li>
            <li><strong>Backups:</strong> Encrypted copies stored in multiple geographic locations</li>
            <li><strong>File Storage:</strong> Encrypted object storage (S3-compatible)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.2 Encryption in Transit</h3>
          <p>
            All data transmitted between your device and our servers is protected:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>HTTPS/TLS:</strong> TLS 1.3 minimum for all connections</li>
            <li><strong>Certificate Authority:</strong> Verified SSL/TLS certificates from trusted CAs</li>
            <li><strong>HSTS:</strong> HTTP Strict Transport Security headers enabled</li>
            <li><strong>API Endpoints:</strong> All API calls require HTTPS</li>
            <li><strong>Certificate Pinning:</strong> Available for mobile apps</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.3 Password Security</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Hashing:</strong> Passwords hashed with bcrypt (cost factor 12)</li>
            <li><strong>Salting:</strong> Unique salt generated per password</li>
            <li><strong>Reset Tokens:</strong> Secure, single-use tokens with expiration</li>
            <li><strong>Minimum Requirements:</strong> 8 characters, mixed case, numbers recommended</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Authentication & Access Control</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">3.1 Authentication Methods</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Email/Password:</strong> Secure login with email verification</li>
            <li><strong>OAuth 2.0:</strong> Social media platform authentication</li>
            <li><strong>API Keys:</strong> For developer access with scoped permissions</li>
            <li><strong>Session Management:</strong> NextAuth.js with secure session handling</li>
            <li><strong>Multi-Factor Authentication (MFA):</strong> Optional TOTP-based 2FA</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">3.2 Access Control</h3>
          <p>
            We implement role-based access control (RBAC) with the principle of least privilege:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Admin:</strong> Full platform access, user management, billing</li>
            <li><strong>Editor:</strong> Create, schedule, and publish posts</li>
            <li><strong>Viewer:</strong> View-only access to analytics and drafts</li>
            <li><strong>Limited:</strong> Specific post or account access only</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">3.3 Session Security</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>HttpOnly Cookies:</strong> Session tokens cannot be accessed by JavaScript</li>
            <li><strong>Secure Flag:</strong> Cookies only transmitted over HTTPS</li>
            <li><strong>SameSite:</strong> Protected against CSRF attacks (SameSite=Lax)</li>
            <li><strong>Timeout:</strong> Sessions expire after 30 days of inactivity</li>
            <li><strong>Logout:</strong> Complete session invalidation on logout</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Network Security</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">4.1 Infrastructure Security</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Hosting:</strong> Vercel enterprise-grade infrastructure</li>
            <li><strong>DDoS Protection:</strong> Cloudflare DDoS mitigation</li>
            <li><strong>Firewall:</strong> Web application firewall (WAF) enabled</li>
            <li><strong>IP Allowlisting:</strong> For API access and integrations</li>
            <li><strong>CDN:</strong> Content delivery network for static assets</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">4.2 API Security</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Rate Limiting:</strong> Prevents brute force attacks and abuse</li>
            <li><strong>Token Validation:</strong> All API calls require valid authentication</li>
            <li><strong>CORS:</strong> Configured to prevent unauthorized cross-origin requests</li>
            <li><strong>Input Validation:</strong> All inputs sanitized to prevent injection attacks</li>
            <li><strong>Output Encoding:</strong> Prevents XSS vulnerabilities</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">4.3 Zero Trust Architecture</h3>
          <p>
            We implement zero-trust security principles:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Every request authenticated and authorized</li>
            <li>Microsegmentation of network components</li>
            <li>Continuous monitoring and threat detection</li>
            <li>Assumption of breach - defense in depth</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Application Security</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">5.1 Secure Development Practices</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Code Review:</strong> All code reviewed before deployment</li>
            <li><strong>Static Analysis:</strong> Automated code scanning for vulnerabilities</li>
            <li><strong>Dependency Management:</strong> Regular updates to security patches</li>
            <li><strong>Secret Management:</strong> Environment variables, no hardcoded secrets</li>
            <li><strong>Version Control:</strong> Git with branch protection rules</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">5.2 OWASP Top 10 Prevention</h3>
          <p>
            We protect against the OWASP Top 10 vulnerabilities:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Injection:</strong> Parameterized queries, input validation</li>
            <li><strong>Broken Authentication:</strong> Secure authentication implementation</li>
            <li><strong>Sensitive Data Exposure:</strong> Encryption at rest and in transit</li>
            <li><strong>XML External Entities:</strong> XML parsing restricted</li>
            <li><strong>Broken Access Control:</strong> RBAC and permission checks</li>
            <li><strong>Security Misconfiguration:</strong> Hardened defaults, security headers</li>
            <li><strong>XSS:</strong> Content Security Policy (CSP), output encoding</li>
            <li><strong>CSRF:</strong> Anti-CSRF tokens, SameSite cookies</li>
            <li><strong>Insecure Deserialization:</strong> No untrusted deserialization</li>
            <li><strong>Using Components with Known Vulnerabilities:</strong> Regular updates</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">5.3 Security Headers</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Content-Security-Policy (CSP) - Prevents XSS</li>
            <li>X-Frame-Options - Prevents clickjacking</li>
            <li>X-Content-Type-Options - Prevents MIME type sniffing</li>
            <li>Strict-Transport-Security (HSTS) - Enforces HTTPS</li>
            <li>Referrer-Policy - Limits referrer information</li>
            <li>Permissions-Policy - Restricts browser APIs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Vulnerability Management</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">6.1 Vulnerability Scanning</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Monthly automated vulnerability scans</li>
            <li>Quarterly penetration testing by third parties</li>
            <li>Continuous dependency scanning with SCA tools</li>
            <li>Real-time threat intelligence monitoring</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">6.2 Remediation</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Critical vulnerabilities: Patched within 24 hours</li>
            <li>High vulnerabilities: Patched within 7 days</li>
            <li>Medium vulnerabilities: Patched within 30 days</li>
            <li>Low vulnerabilities: Patched within 90 days</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">6.3 Responsible Disclosure</h3>
          <p>
            If you discover a security vulnerability, please report it responsibly:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Email: <a href="mailto:security@zyvarin.com" className="text-indigo-600 hover:underline">security@zyvarin.com</a></li>
            <li>PGP Key available for sensitive reports</li>
            <li>We commit to: Acknowledge within 24 hours, Update within 7 days, Credit discovery (optional)</li>
            <li>No legal action for responsible disclosure</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Data Backups & Disaster Recovery</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">7.1 Backup Strategy</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Frequency:</strong> Hourly database backups</li>
            <li><strong>Encryption:</strong> All backups encrypted with AES-256</li>
            <li><strong>Geographic Redundancy:</strong> Backups in multiple regions</li>
            <li><strong>Retention:</strong> 90-day backup retention policy</li>
            <li><strong>Testing:</strong> Monthly backup restoration tests</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">7.2 Disaster Recovery Plan (DRP)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>RTO (Recovery Time Objective):</strong> 1 hour</li>
            <li><strong>RPO (Recovery Point Objective):</strong> 15 minutes</li>
            <li><strong>High Availability:</strong> Multi-region deployment</li>
            <li><strong>Failover:</strong> Automatic failover to backup infrastructure</li>
            <li><strong>Testing:</strong> Quarterly disaster recovery drills</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">7.3 Business Continuity</h3>
          <p>
            We maintain a Business Continuity Plan covering:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Personnel continuity and cross-training</li>
            <li>Alternate processing sites and redundant systems</li>
            <li>Emergency communication procedures</li>
            <li>Customer notification protocols</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Compliance Certifications</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">8.1 SOC 2 Type II</h3>
          <p>
            Zyvarin is SOC 2 Type II compliant, validated by independent auditors. This certification covers:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Security - System protected against unauthorized access</li>
            <li>Availability - System available as intended</li>
            <li>Processing Integrity - System data complete and accurate</li>
            <li>Confidentiality - System data protected from unauthorized disclosure</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            <strong>Audit Frequency:</strong> Annual SOC 2 Type II audits conducted by independent auditors. 
            Report available to customers under NDA.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">8.2 GDPR Compliance</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Data Processing Agreement (DPA) in place</li>
            <li>Standard Contractual Clauses for international transfers</li>
            <li>Data Protection Impact Assessment (DPIA) conducted</li>
            <li>Data Protection Officer (DPO) appointed</li>
            <li>Data breach notification procedures implemented</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">8.3 CCPA Compliance</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Consumer privacy rights respected and implemented</li>
            <li>Data collection disclosures provided</li>
            <li>Opt-out mechanisms available</li>
            <li>No sale or sharing of personal information</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">8.4 Industry Standards</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>ISO 27001 (Information Security Management) - Roadmap: 2025</li>
            <li>PCI DSS Compliance - Via Razorpay (payment processor)</li>
            <li>OAuth 2.0 Certified - Social media integrations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">9. Incident Response & Security Events</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">9.1 Incident Response Team</h3>
          <p>
            We have a dedicated incident response team trained to handle security incidents:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>24/7 on-call security personnel</li>
            <li>Incident commander and escalation procedures</li>
            <li>Forensics and log analysis capabilities</li>
            <li>Legal and compliance consultation available</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">9.2 Incident Response Timeline</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Detection:</strong> Real-time monitoring and alerts</li>
            <li><strong>Response:</strong> Immediate investigation initiated</li>
            <li><strong>Containment:</strong> 1-4 hours depending on severity</li>
            <li><strong>Notification:</strong> Customer notification within 24 hours of confirmation</li>
            <li><strong>Post-Incident:</strong> Root cause analysis and preventive measures</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">9.3 Security Monitoring</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>24/7 Security Operations Center (SOC) monitoring</li>
            <li>Intrusion Detection System (IDS) deployed</li>
            <li>Security Information and Event Management (SIEM) implemented</li>
            <li>Log aggregation and analysis for threat detection</li>
            <li>Automated alerting for suspicious activities</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">10. Physical Security</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">10.1 Data Center Security</h3>
          <p>
            Our data centers (via Vercel) implement multiple physical security controls:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Restricted access with biometric authentication</li>
            <li>Video surveillance and monitoring</li>
            <li>Environmental controls (temperature, humidity, fire suppression)</li>
            <li>Redundant power supplies and backup generators</li>
            <li>Regular security audits and penetration testing</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">10.2 Office Security</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Controlled access to office facilities</li>
            <li>Security badges required for all employees</li>
            <li>Clean desk policy enforced</li>
            <li>Secure destruction of sensitive documents</li>
            <li>Regular security awareness training</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">11. Employee Security & Training</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">11.1 Hiring & Screening</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Background checks for all employees</li>
            <li>Reference verification</li>
            <li>Confidentiality agreements signed</li>
            <li>Security clearance verification where required</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">11.2 Security Training</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Annual mandatory security awareness training</li>
            <li>Data protection and privacy training</li>
            <li>Incident response training</li>
            <li>Phishing simulations and awareness</li>
            <li>Role-specific security training</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">11.3 Access Control & Privileges</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Principle of least privilege enforced</li>
            <li>Role-based access to systems</li>
            <li>Regular access reviews (quarterly)</li>
            <li>Immediate revocation upon termination</li>
            <li>Privileged access management (PAM) system</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">11.4 Offboarding</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>All system access revoked immediately upon termination</li>
            <li>Return of equipment and credentials</li>
            <li>Exit interview including security/confidentiality review</li>
            <li>Post-employment non-disclosure agreement enforcement</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">12. Third-Party & Vendor Security</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">12.1 Vendor Assessment</h3>
          <p>
            All third-party vendors and service providers are evaluated for security:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Security questionnaire completion</li>
            <li>Compliance certification review (SOC 2, ISO 27001, etc.)</li>
            <li>Insurance verification (cyber liability)</li>
            <li>Data protection agreement execution</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">12.2 Vendor Monitoring</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Annual security reviews</li>
            <li>Incident reporting requirements</li>
            <li>Right to audit vendor systems</li>
            <li>Termination procedures and data handling</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">12.3 Current Vendors</h3>
          <p>
            Key security vendors we rely on:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Vercel:</strong> SOC 2 Type II, ISO 27001 certified hosting</li>
            <li><strong>Razorpay:</strong> PCI-DSS Level 1 payment processing</li>
            <li><strong>Google Cloud:</strong> Multi-layered security for APIs</li>
            <li><strong>Cloudflare:</strong> DDoS protection and WAF services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">13. Compliance Audits & Assessments</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">13.1 Internal Audits</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Quarterly security audits conducted internally</li>
            <li>Monthly vulnerability assessments</li>
            <li>Annual comprehensive risk assessment</li>
            <li>Documented findings and remediation tracking</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">13.2 External Audits</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Annual SOC 2 Type II audit by independent auditor</li>
            <li>Quarterly penetration testing by third-party firm</li>
            <li>Annual compliance review (GDPR, CCPA, etc.)</li>
            <li>Public audit reports available to customers (under NDA)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">13.3 Regulatory Compliance</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>GDPR compliance for EU customers</li>
            <li>CCPA compliance for California residents</li>
            <li>ePrivacy Directive compliance (UK/EU)</li>
            <li>State privacy laws compliance (Virginia, Colorado, etc.)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">14. Data Protection & Privacy</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">14.1 Data Classification</h3>
          <p>
            Data is classified by sensitivity level:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Public:</strong> Non-sensitive information (blog posts, public profiles)</li>
            <li><strong>Internal:</strong> Business information (internal documents)</li>
            <li><strong>Confidential:</strong> Private data (passwords, API keys)</li>
            <li><strong>Restricted:</strong> Highly sensitive (payment data, health information)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">14.2 Data Minimization</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Collect only necessary personal data</li>
            <li>Retention limited to specified periods</li>
            <li>Regular deletion of unnecessary data</li>
            <li>No collection of sensitive categories without explicit consent</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">14.3 Privacy by Design</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Privacy considered in all system design</li>
            <li>Default settings favor privacy (opt-in not opt-out)</li>
            <li>Regular privacy impact assessments</li>
            <li>Data minimization principles applied throughout</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">15. Transparency & Accountability</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">15.1 Documentation</h3>
          <p>
            Zyvarin maintains comprehensive security documentation:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Information Security Policy</li>
            <li>Risk Register and Risk Assessment</li>
            <li>Security Architecture Documentation</li>
            <li>Incident Response Plan</li>
            <li>Business Continuity Plan</li>
            <li>Data Protection Impact Assessments</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">15.2 Transparency Reports</h3>
          <p>
            We publish transparency reports on:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Government data requests received</li>
            <li>Data breach incidents and resolutions</li>
            <li>Security incidents and impact assessments</li>
            <li>Annual security audit summaries (non-sensitive portions)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">15.3 Accountability Measures</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Data Protection Officer (DPO) appointment and contact availability</li>
            <li>Clear ownership and responsibility assignments</li>
            <li>Performance metrics and KPIs tracked</li>
            <li>Regular board-level security reporting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">16. Insurance & Financial Protection</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">16.1 Cyber Liability Insurance</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Comprehensive cyber liability coverage</li>
            <li>Data breach notification costs covered</li>
            <li>Regulatory fines and penalties covered (where permitted by law)</li>
            <li>Incident response and forensics covered</li>
            <li>Annual coverage limit: $5,000,000+</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">16.2 Insurance Verification</h3>
          <p>
            We can provide proof of insurance coverage upon request. Contact: <a href="mailto:legal@zyvarin.com" className="text-indigo-600 hover:underline">legal@zyvarin.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">17. Security Contact & Reporting</h2>
          <div className="bg-slate-50 p-6 rounded-lg mt-4">
            <p><strong>Report Security Vulnerabilities:</strong></p>
            <p>Email: <a href="mailto:security@zyvarin.com" className="text-indigo-600 hover:underline">security@zyvarin.com</a></p>
            <p className="text-sm text-slate-600 mt-2">Response time: Within 24 hours</p>
            
            <p className="mt-6"><strong>Data Protection Officer (DPO):</strong></p>
            <p>Email: <a href="mailto:dpo@zyvarin.com" className="text-indigo-600 hover:underline">dpo@zyvarin.com</a></p>
            
            <p className="mt-6"><strong>Privacy Questions:</strong></p>
            <p>Email: <a href="mailto:privacy@zyvarin.com" className="text-indigo-600 hover:underline">privacy@zyvarin.com</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">18. Policy Updates & Contact</h2>
          <p>
            This Security & Compliance Policy is regularly reviewed and updated. Material changes will be announced 
            with 30 days' notice. Continued use of Zyvarin constitutes acceptance of updates.
          </p>
        </section>
      </div>
    </div>
  )
}
