import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Processing Agreement (DPA) - Zyvarin Social',
  description: 'Review our Data Processing Agreement for GDPR compliance'
}

export default function DPAPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">Data Processing Agreement (DPA)</h1>
        <p className="text-lg text-slate-600">Last updated: December 8, 2025</p>
      </div>

      <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Introduction & Applicability</h2>
          <p>
            This Data Processing Agreement ("DPA") is entered into between Zyvarin Social Inc. ("Data Controller") 
            and its customers ("Data Subject" or "Customer") and applies to the processing of personal data in connection 
            with the provision of Zyvarin services.
          </p>
          <p>
            This DPA applies to customers located in the European Union, United Kingdom, European Economic Area, 
            or other jurisdictions with data protection laws similar to GDPR.
          </p>
          <p className="text-sm text-slate-600 mt-4">
            <strong>Important:</strong> This DPA is separate from and supplementary to our Terms of Service and Privacy Policy. 
            This DPA governs how we process personal data on your behalf as a Data Processor.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Roles & Responsibilities</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">2.1 Data Controller</h3>
          <p>
            You (the Customer) are the Data Controller. You determine the purposes and means of processing personal data 
            through your use of Zyvarin. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Determining what content to post on social media</li>
            <li>Deciding which social media accounts to connect</li>
            <li>Setting publishing schedules and frequency</li>
            <li>Managing team member access</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.2 Data Processor</h3>
          <p>
            Zyvarin Social is the Data Processor. We process personal data on your behalf and only according to your instructions. 
            We agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Process personal data only as instructed by you</li>
            <li>Implement technical and organizational security measures</li>
            <li>Ensure your compliance with GDPR obligations</li>
            <li>Maintain confidentiality of processed data</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">2.3 Sub-Processors</h3>
          <p>
            Zyvarin uses the following sub-processors (third parties who process data on our behalf):
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Vercel (Hosting):</strong> Infrastructure and hosting services</li>
            <li><strong>PostgreSQL Database Provider:</strong> Database hosting and backup</li>
            <li><strong>Google Gemini API:</strong> AI-powered content suggestions</li>
            <li><strong>Razorpay (Payments):</strong> Payment processing</li>
            <li><strong>Nodemailer (Email):</strong> Transactional email delivery</li>
            <li><strong>Google Analytics:</strong> Usage analytics (anonymized)</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            You authorize us to use these sub-processors. We will notify you 30 days in advance of any changes to sub-processors.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Categories of Personal Data</h2>
          <p>
            Zyvarin processes the following categories of personal data:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Account Information:</strong> Email, name, profile data, preferences</li>
            <li><strong>Social Media Data:</strong> OAuth tokens, social media handles, post content</li>
            <li><strong>Payment Data:</strong> Billing address, last 4 digits of payment method (full details via Razorpay)</li>
            <li><strong>Usage Data:</strong> Login times, pages visited, features used, device information</li>
            <li><strong>Content Data:</strong> Posts, media, drafts, scheduling information</li>
            <li><strong>Communication Data:</strong> Support messages, feedback, notifications</li>
            <li><strong>Technical Data:</strong> IP addresses, cookies, device identifiers</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Processing Operations & Purposes</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">4.1 Authorized Processing Purposes</h3>
          <p>
            You authorize Zyvarin to process personal data solely for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Providing the Zyvarin social media scheduling service</li>
            <li>Managing your subscription and billing</li>
            <li>Publishing content to connected social media accounts</li>
            <li>Generating analytics and engagement reports</li>
            <li>Providing customer support</li>
            <li>Sending service notifications and updates</li>
            <li>Detecting and preventing fraud or abuse</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">4.2 Prohibited Processing</h3>
          <p>
            Zyvarin shall NOT process personal data for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Marketing purposes (except service announcements)</li>
            <li>Selling, renting, or sharing data with third parties</li>
            <li>Profiling or automated decision-making</li>
            <li>Training machine learning models (except aggregated, anonymized data)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Data Subject Rights</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">5.1 Your Responsibilities as Controller</h3>
          <p>
            As the Data Controller, YOU are responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Ensuring lawful basis for processing (consent, contract, legitimate interest, etc.)</li>
            <li>Obtaining consent from data subjects (your social media followers) if required</li>
            <li>Responding to data subject requests (access, deletion, portability)</li>
            <li>Conducting Data Protection Impact Assessments (DPIA) if applicable</li>
            <li>Notifying data subjects of any data breaches</li>
            <li>Complying with all GDPR obligations</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">5.2 Zyvarin's Support of Your Rights</h3>
          <p>
            Zyvarin will assist you in fulfilling data subject rights:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Right of Access:</strong> You can download your data from your account dashboard</li>
            <li><strong>Right to Deletion:</strong> You can delete your account and associated data</li>
            <li><strong>Right to Correction:</strong> You can update your profile information</li>
            <li><strong>Right to Data Portability:</strong> Export your data in standard formats</li>
            <li><strong>Right to Restrict Processing:</strong> Request limitation of specific processing activities</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">5.3 Data Subject Requests</h3>
          <p>
            If a data subject requests access to their personal data, they should contact you (the Data Controller). 
            You may forward requests to us, and we will respond within 30 days.
          </p>
          <p>
            Contact: <a href="mailto:dpa@zyvarin.com" className="text-indigo-600 hover:underline">dpa@zyvarin.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Data Security & Confidentiality</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">6.1 Technical Measures</h3>
          <p>
            Zyvarin implements the following security measures:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Encryption:</strong> AES-256 encryption at rest, TLS 1.3 in transit</li>
            <li><strong>Access Control:</strong> Role-based access control (RBAC), principle of least privilege</li>
            <li><strong>Authentication:</strong> OAuth 2.0, bcrypt password hashing, multi-factor authentication (optional)</li>
            <li><strong>Database Security:</strong> PostgreSQL with row-level security (RLS)</li>
            <li><strong>Network Security:</strong> HTTPS/TLS, firewall protection</li>
            <li><strong>Regular Audits:</strong> Monthly security assessments and vulnerability testing</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">6.2 Organizational Measures</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Limited employee access to personal data on need-to-know basis</li>
            <li>Confidentiality agreements with all employees and contractors</li>
            <li>Data protection training for all staff members</li>
            <li>Background checks for employees with data access</li>
            <li>Incident response plan and breach notification procedures</li>
            <li>Regular security awareness training</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">6.3 Certification & Compliance</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>SOC 2 Type II compliant</li>
            <li>GDPR compliant processing practices</li>
            <li>Cyber liability insurance coverage</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">7. International Data Transfers</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">7.1 Transfer Mechanisms</h3>
          <p>
            Personal data may be transferred from the EEA to the United States through:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Standard Contractual Clauses (SCCs):</strong> EU Commission-approved standard contractual clauses</li>
            <li><strong>Adequacy Decisions:</strong> Where applicable (e.g., UK, Switzerland)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">7.2 Data Localization</h3>
          <p>
            Your personal data is stored primarily in the United States on Vercel servers. 
            Backup copies may be stored in multiple geographic locations for disaster recovery.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">7.3 Derogations</h3>
          <p>
            You may request specific data localization or transfer restrictions. Contact us at <a href="mailto:dpa@zyvarin.com" className="text-indigo-600 hover:underline">dpa@zyvarin.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Data Retention & Deletion</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">8.1 Retention Periods</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Active Account Data:</strong> Retained while account is active</li>
            <li><strong>Deleted Accounts:</strong> Deleted within 30 days of deletion request</li>
            <li><strong>Backup Data:</strong> Retained for 90 days for disaster recovery</li>
            <li><strong>Payment Records:</strong> Retained for 7 years (legal/tax compliance)</li>
            <li><strong>Server Logs:</strong> Deleted after 30 days</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">8.2 Deletion Request Process</h3>
          <p>
            You may request deletion of your data by:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Deleting your account from account settings</li>
            <li>Emailing a deletion request to <a href="mailto:dpa@zyvarin.com" className="text-indigo-600 hover:underline">dpa@zyvarin.com</a></li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            We will delete all personal data within 30 days, except where legal obligations require retention 
            (e.g., tax records, fraud investigations).
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">9. Data Breach Notification</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">9.1 Breach Detection & Response</h3>
          <p>
            If we detect a personal data breach, we will:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Immediately begin investigation and containment</li>
            <li>Notify you (the Data Controller) within 24 hours</li>
            <li>Provide details of the breach and affected data</li>
            <li>Recommend notifications to data subjects and authorities</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">9.2 Your Responsibilities</h3>
          <p>
            As the Data Controller, YOU must:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Notify affected data subjects if required by law</li>
            <li>Report to the Data Protection Authority (DPA) if required</li>
            <li>Maintain breach notification records</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">9.3 Contact for Breaches</h3>
          <p>
            Report suspected breaches to: <a href="mailto:security@zyvarin.com" className="text-indigo-600 hover:underline">security@zyvarin.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">10. Data Protection Impact Assessment (DPIA)</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">10.1 When DPIA is Required</h3>
          <p>
            If your processing is likely to result in high risk to data subjects, you may be required to conduct a DPIA. 
            Zyvarin will assist by providing information about our processing practices.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">10.2 Zyvarin's Support</h3>
          <p>
            We provide documentation to help you complete DPIA requirements:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Security documentation and certifications</li>
            <li>Processing information and risk assessment</li>
            <li>Technical and organizational measures implemented</li>
          </ul>
          <p>
            Contact: <a href="mailto:dpa@zyvarin.com" className="text-indigo-600 hover:underline">dpa@zyvarin.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">11. Audit Rights</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">11.1 Audit Access</h3>
          <p>
            You may audit Zyvarin's compliance with this DPA by:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Requesting our SOC 2 Type II report (annual audit)</li>
            <li>Requesting specific security certifications or documentation</li>
            <li>Conducting a limited on-site audit (with 30 days' notice)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">11.2 Audit Frequency</h3>
          <p>
            Audits may be conducted once per calendar year at no additional cost. 
            Additional audits are subject to reasonable fees to cover our costs.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">11.3 Confidentiality</h3>
          <p>
            Audit findings are confidential. Both parties agree to protect proprietary information disclosed during audits.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">12. Amendments & Modifications</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">12.1 DPA Changes</h3>
          <p>
            Zyvarin may modify this DPA to comply with applicable laws. We will notify you 30 days in advance 
            of material changes. Continued use of the Service constitutes acceptance.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">12.2 Sub-Processor Changes</h3>
          <p>
            We will notify you 30 days before adding or replacing sub-processors. You may object to sub-processor 
            changes by providing written notice within 15 days. If you object, we will work with you to find an alternative.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">13. Termination & Data Return</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">13.1 Upon Account Deletion</h3>
          <p>
            When your account is deleted or subscription terminates:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>You may request a data export within 30 days</li>
            <li>After 30 days, all data will be permanently deleted</li>
            <li>Backup copies retained for 90 days for disaster recovery</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">13.2 Compliance Upon Termination</h3>
          <p>
            Zyvarin will certify in writing that all data has been deleted or returned, 
            except where legal obligations require retention.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">14. Liability & Indemnification</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">14.1 Liability Limitation</h3>
          <p>
            As a Processor, Zyvarin is not liable for GDPR violations caused by your instructions as the Controller. 
            However, we are liable for violations caused by our processing practices.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">14.2 Indemnification</h3>
          <p>
            Zyvarin will indemnify and defend you against claims that our processing practices violate GDPR, 
            provided you have complied with your controller obligations.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">15. Contact Information</h2>
          <div className="bg-slate-50 p-6 rounded-lg mt-4">
            <p><strong>For DPA Questions:</strong></p>
            <p>Email: <a href="mailto:dpa@zyvarin.com" className="text-indigo-600 hover:underline">dpa@zyvarin.com</a></p>
            <p><strong>For Data Breaches:</strong></p>
            <p>Email: <a href="mailto:security@zyvarin.com" className="text-indigo-600 hover:underline">security@zyvarin.com</a></p>
            <p><strong>Data Protection Officer:</strong></p>
            <p>Email: <a href="mailto:dpo@zyvarin.com" className="text-indigo-600 hover:underline">dpo@zyvarin.com</a></p>
          </div>
        </section>
      </div>
    </div>
  )
}
