import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Zyvarin Social',
  description: 'Read our Terms of Service for using Zyvarin Social'
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-lg text-slate-600">Last updated: December 8, 2025</p>
      </div>

      <div className="prose prose-lg max-w-none text-slate-700 space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Zyvarin Social ("Platform," "Service"), you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service. By using the Platform, you acknowledge that you have read, understood, 
            and agree to be bound by all the terms contained herein.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Service Description</h2>
          <p>
            Zyvarin Social is a social media scheduling and management platform that enables users to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Schedule posts to multiple social media platforms (LinkedIn, Twitter/X, Dev.to)</li>
            <li>Receive AI-powered content suggestions using Google Gemini API</li>
            <li>View analytics and engagement metrics</li>
            <li>Manage multiple social media accounts</li>
            <li>Collaborate with team members (Premium plan)</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            We reserve the right to modify, suspend, or discontinue the Service or any portion thereof at any time, 
            with or without notice.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Subscription Plans & Pricing</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">3.1 Available Plans</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Starter (Free):</strong> Basic scheduling for personal use</li>
            <li><strong>Creator ($29/month):</strong> Advanced features for individual creators</li>
            <li><strong>Premium ($99/month):</strong> Team collaboration and advanced analytics</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">3.2 Pricing Changes</h3>
          <p>
            We reserve the right to change subscription prices at any time. Current subscribers will be notified 
            30 days in advance of any price increases. Continued use of the Service after such notice constitutes acceptance 
            of the new pricing.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">3.3 Free Trial</h3>
          <p>
            We offer a 14-day free trial of premium features. Trial credits expire after 14 days and do not convert to paid subscription. 
            A valid payment method is required to activate the trial but will not be charged unless you upgrade.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Billing & Payment</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">4.1 Payment Processing</h3>
          <p>
            Payments are processed through Razorpay, a PCI-DSS Level 1 compliant payment processor. 
            By providing payment information, you authorize us to charge your payment method for your subscription.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">4.2 Billing Cycle</h3>
          <p>
            Subscriptions are billed monthly on the same day you upgrade. If your billing date falls on a day that doesn't exist 
            (e.g., February 31st), you will be billed on the last day of the month.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">4.3 Automatic Renewal</h3>
          <p>
            Paid subscriptions automatically renew at the end of each billing cycle unless cancelled. 
            You can cancel your subscription at any time from your account settings.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">4.4 Failed Payments</h3>
          <p>
            If your payment method fails, we will attempt to collect payment using your most recent valid payment information. 
            If payment fails three times, your subscription will be downgraded to the Starter plan.
          </p>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-red-600 mb-4">5. NO REFUND POLICY</h2>
          
          <div className="bg-red-50 border-l-4 border-red-600 p-6 my-6">
            <h3 className="text-2xl font-semibold text-slate-800 mb-3">⚠️ Important: No Refunds Offered</h3>
            <p className="font-semibold mb-4">
              All subscription fees are non-refundable. There are no exceptions to this policy.
            </p>
            <p className="mb-4">
              Once you have been charged for a subscription period, you will not receive a refund or credit for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Partial months or periods of non-use</li>
              <li>Unused features or functionality</li>
              <li>Service interruptions or downtime (except as provided in our SLA)</li>
              <li>Cancelled subscriptions (refunds available only if required by applicable law)</li>
              <li>Unused credits from promotional offers</li>
            </ul>
            <p className="text-sm text-slate-600 mt-4">
              <strong>Exception:</strong> If you are a consumer in the European Union or other jurisdiction with mandatory consumer protection laws, 
              you may be entitled to a refund within 14 days of purchase if such laws apply.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3">5.1 Cancellation & Downgrade</h3>
          <p>
            You can cancel your subscription at any time. Cancellation takes effect at the end of your current billing cycle. 
            You will have access to paid features until the end of your billing period. Downgrades take effect immediately 
            and your account will be limited to Starter features.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">5.2 Account Suspension for Non-Payment</h3>
          <p>
            If you fail to pay your subscription fees, we reserve the right to suspend your account after 30 days. 
            Your data will be retained for 90 days from suspension. After 90 days, your account and all associated data will be permanently deleted.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">6. User Responsibilities</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">6.1 Account Credentials</h3>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and password. 
            You agree to accept responsibility for all activities that occur under your account. 
            You must immediately notify us of any unauthorized use of your account.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">6.2 Content Responsibility</h3>
          <p>
            You are solely responsible for all content you create, schedule, or publish through the Platform. You represent and warrant that:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>You have all necessary rights and permissions to publish the content</li>
            <li>Your content does not infringe any intellectual property rights</li>
            <li>Your content complies with all applicable laws and platform policies</li>
            <li>Your content does not contain defamatory, harassing, or abusive material</li>
          </ul>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">6.3 Social Media Terms Compliance</h3>
          <p>
            You agree to comply with the terms of service of all social media platforms you connect to Zyvarin. 
            You are responsible for any violations of their policies through your use of our Platform.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Prohibited Activities</h2>
          <p>
            You agree NOT to use the Platform for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Posting illegal, harassing, defamatory, or abusive content</li>
            <li>Spam, unsolicited marketing, or multi-level marketing schemes</li>
            <li>Impersonating others or misrepresenting your identity</li>
            <li>Violating any social media platform's terms of service</li>
            <li>Copyright infringement or plagiarism</li>
            <li>Automated abuse (bots, scrapers, excessive API calls)</li>
            <li>Phishing, social engineering, or other fraudulent activities</li>
            <li>Exploiting or disrupting our Service or its infrastructure</li>
            <li>Storing or transmitting viruses, malware, or harmful code</li>
            <li>Circumventing security measures or accessing unauthorized areas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Account Suspension & Termination</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">8.1 Right to Suspend</h3>
          <p>
            We may immediately suspend your account if we believe you are violating these Terms or engaging in prohibited activities. 
            We will provide notice of suspension and an opportunity to appeal within 10 business days.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">8.2 Termination</h3>
          <p>
            You may terminate your account at any time by deleting it from your settings. 
            We may terminate your account for violation of these Terms or for inactivity (no login for 12 months).
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">8.3 Data Upon Termination</h3>
          <p>
            Upon account termination, your data will be deleted within 30 days. Deleted data cannot be recovered. 
            We recommend exporting your data before termination if you wish to retain it.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">9. Intellectual Property</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">9.1 Zyvarin's IP</h3>
          <p>
            All content, features, and functionality of the Platform (including but not limited to software, text, graphics, logos, icons, images) 
            are owned by Zyvarin Social, its licensors, or other providers and are protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">9.2 Your Content License</h3>
          <p>
            By uploading or creating content in Zyvarin, you grant us a non-exclusive, worldwide, royalty-free license to store, process, 
            and display your content solely to provide the Service. You retain all rights to your content and can delete it at any time.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">9.3 Feedback & Suggestions</h3>
          <p>
            If you provide feedback, suggestions, or ideas about our Platform, we may use them without restriction. 
            You agree that any such feedback shall be deemed non-confidential and non-proprietary.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">10. Disclaimer of Warranties</h2>
          <p>
            THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. 
            TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, ZYVARIN DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, 
            INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
            AND NON-INFRINGEMENT.
          </p>
          <p>
            ZYVARIN DOES NOT WARRANT THAT:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>The Service will be uninterrupted or error-free</li>
            <li>Defects will be corrected</li>
            <li>The Service is free of viruses or malicious code</li>
            <li>Your use of the Service will achieve desired results</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">11. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL ZYVARIN BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES 
            (INCLUDING LOST PROFITS, LOST REVENUE, LOST DATA, OR BUSINESS INTERRUPTION) ARISING FROM YOUR USE OF THE PLATFORM, 
            EVEN IF ZYVARIN HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p>
            TO THE EXTENT PERMITTED BY LAW, ZYVARIN'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING TO THE PLATFORM 
            SHALL NOT EXCEED THE AMOUNT YOU PAID TO ZYVARIN IN THE 12 MONTHS PRECEDING THE CLAIM (OR $100 IF YOU HAVE NOT PAID ANYTHING).
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">12. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Zyvarin Social and its officers, directors, employees, and agents 
            from any claims, damages, losses, and liabilities (including attorney's fees) arising from or related to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Your use of the Platform</li>
            <li>Your violation of these Terms</li>
            <li>Your content or posts published through the Platform</li>
            <li>Any infringement of intellectual property or other rights by your content</li>
            <li>Your violation of any third-party rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">13. Third-Party Links & Services</h2>
          <p>
            The Platform may contain links to third-party websites and services. Zyvarin is not responsible for and does not endorse 
            any third-party content, products, or services. Your use of third-party services is governed by their terms and privacy policies.
          </p>
          <p>
            Third-party service integrations (LinkedIn, Twitter, Dev.to, Google Gemini, Razorpay) are subject to their respective terms and policies.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">14. Governing Law & Dispute Resolution</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">14.1 Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States, 
            without regard to its conflict of law principles.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">14.2 Dispute Resolution</h3>
          <p>
            Any dispute arising out of or relating to these Terms shall first be resolved through good faith negotiation between the parties. 
            If negotiation fails, the dispute shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">14.3 Class Action Waiver</h3>
          <p>
            You agree that disputes will be resolved on an individual basis and not as part of any class action lawsuit.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">15. Service Level Agreement (SLA)</h2>
          
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">15.1 Uptime Commitment</h3>
          <p>
            We commit to maintaining 99.5% uptime for the Platform on a monthly basis (excluding scheduled maintenance).
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">15.2 Scheduled Maintenance</h3>
          <p>
            We perform scheduled maintenance during off-peak hours. We will provide 48-hour notice for major maintenance.
          </p>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">15.3 Service Credits</h3>
          <p>
            If we fail to meet our uptime commitment, paid subscribers are eligible for service credits (not refunds):
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>99.0%-99.4% uptime: 10% monthly fee credit</li>
            <li>98.0%-98.9% uptime: 25% monthly fee credit</li>
            <li>Below 98% uptime: 50% monthly fee credit</li>
          </ul>
          <p className="text-sm text-slate-600 mt-4">
            Credits are issued as account credits, not cash refunds, and must be claimed within 30 days of the outage.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">16. Modifications to Terms</h2>
          <p>
            Zyvarin reserves the right to modify these Terms at any time. Material changes will be announced with 30 days' notice. 
            Your continued use of the Platform following notification of changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">17. Contact & Support</h2>
          <p>
            For questions about these Terms or to report violations, please contact us:
          </p>
          <div className="bg-slate-50 p-6 rounded-lg mt-4">
            <p><strong>Zyvarin Social Inc.</strong></p>
            <p>Email: <a href="mailto:legal@zyvarin.com" className="text-indigo-600 hover:underline">legal@zyvarin.com</a></p>
            <p>Support: <a href="https://zyvarin.com/support" className="text-indigo-600 hover:underline">zyvarin.com/support</a></p>
          </div>
        </section>
      </div>
    </div>
  )
}
