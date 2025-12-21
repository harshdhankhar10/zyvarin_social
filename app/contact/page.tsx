'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Mail, Clock, MessageSquare } from 'lucide-react';
import Navbar from '@/components/Global/Navbar';
import Footer from '@/components/Global/Footer';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full bg-white">
      <Navbar />

      <section className="pt-48 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Let's Talk
          </h1>
          <p className="text-xl text-slate-600">
            Have a question? Need help? Or just want to share your Zyvarin success story? 
            I read every message and respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600 mb-4">Direct to my inbox</p>
              <a href="mailto:harsh@zyvarin.com" className="text-blue-600 hover:underline font-semibold">
                harsh@zyvarin.com
              </a>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
              <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Chat</h3>
              <p className="text-slate-600 mb-4">Live chat on the website</p>
              <button className="text-green-600 hover:underline font-semibold">
                Start Chat
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
              <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Response Time</h3>
              <p className="text-slate-600 mb-4">Usually within 24 hours</p>
              <p className="text-slate-700 font-semibold">Business hours: 9am-5pm EST</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Send us a Message</h2>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-green-900 mb-2">Thank you!</h3>
              <p className="text-green-700 mb-4">Your message has been sent. I'll get back to you soon.</p>
              <p className="text-sm text-green-600">Check your email for a confirmation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
                  Company / Creator Name (Optional)
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your company or creator handle"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full"
                />
              </div>

              <Button type="submit" size="lg" className="group w-full">
                Send Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </form>
          )}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'How much does Zyvarin cost?',
                a: 'We have transparent, simple pricing starting at $9/month for solo creators. No per-platform surcharges or hidden fees. Check our pricing page for the full breakdown.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! You get 14 days completely free. No credit card required. If you\'re not happy, we\'ll refund your money for the first 30 days.'
              },
              {
                q: 'What platforms does Zyvarin support?',
                a: 'Currently LinkedIn, Twitter/X, and Dev.to. More platforms coming soon based on creator requests.'
              },
              {
                q: 'Can I use Zyvarin as an agency?',
                a: 'Absolutely. You can manage unlimited client accounts, set up team members with approval workflows, and white-label for your clients. Contact sales for enterprise pricing.'
              },
              {
                q: 'Do you offer a money-back guarantee?',
                a: 'Yes. If you\'re not happy within 30 days, we\'ll refund your money. No questions asked. That\'s how confident we are in Zyvarin.'
              },
              {
                q: 'How fast is customer support?',
                a: 'I personally handle support. You can expect a response within 24 hours. For urgent issues, email harsh@zyvarin.com and mark it as URGENT.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.q}</h3>
                <p className="text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <Link href="/help">
              <Button variant="outline">
                Visit Help Center
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join 50K+ creators who have already transformed their social media game.
          </p>
          <Link href="/signup">
            <Button size="lg" className="group w-full sm:w-auto">
              Start Your Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
