'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { EnquiryType } from '@/types';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Podcast Guest' as EnquiryType,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const enquiryOptions: EnquiryType[] = [
    'Podcast Guest',
    'Brand Collaboration',
    'Sponsorship',
    'Media',
    'General Enquiry',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Form validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter your message.');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Podcast Guest',
          message: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('A network error occurred. Please check your connection.');
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#EDE5DE] rounded-3xl p-8 md:p-12 border border-[#756B67]/15 shadow-xs relative overflow-hidden">
      {/* Decorative floral watermark */}
      <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-10">
        <svg viewBox="0 0 200 200" className="w-64 h-64 text-[#756B67]" fill="currentColor">
          <circle cx="100" cy="100" r="80" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] font-sans text-[#756B67] font-semibold">
            Get In Touch
          </span>
          <h3 className="font-serif text-3xl md:text-4xl text-[#292625] font-light mt-1">
            Send an Enquiry
          </h3>
          <p className="font-sans text-xs md:text-sm text-[#756B67] mt-2">
            Connect with our production and editorial team for guest suggestions, sponsorships, or brand collaborations.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-[#F4F1EC] border border-[#C7A45B]/40 rounded-2xl p-8 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-[#E4D3CC] text-[#292625] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#A5843A]" />
            </div>
            <h4 className="font-serif text-2xl text-[#292625]">Thank You For Connecting</h4>
            <p className="font-sans text-xs md:text-sm text-[#756B67] mt-2 max-w-md mx-auto">
              Your message has been received and added to our editorial review pipeline. Our team will get back to you shortly.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.15em] hover:bg-[#3D3937] transition-all"
            >
              Submit Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-sans font-medium text-[#292625] mb-2">
                  Full Name <span className="text-[#D88F91]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohini Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-xs font-sans text-[#292625] placeholder-[#756B67]/50 focus:outline-none focus:border-[#C7A45B] focus:ring-1 focus:ring-[#C7A45B] transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-sans font-medium text-[#292625] mb-2">
                  Email Address <span className="text-[#D88F91]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rohini@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-xs font-sans text-[#292625] placeholder-[#756B67]/50 focus:outline-none focus:border-[#C7A45B] focus:ring-1 focus:ring-[#C7A45B] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Phone Number */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-sans font-medium text-[#292625] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-xs font-sans text-[#292625] placeholder-[#756B67]/50 focus:outline-none focus:border-[#C7A45B] focus:ring-1 focus:ring-[#C7A45B] transition-colors"
                />
              </div>

              {/* Subject / Enquiry Type */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] font-sans font-medium text-[#292625] mb-2">
                  Enquiry Type <span className="text-[#D88F91]">*</span>
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value as EnquiryType })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-xs font-sans text-[#292625] focus:outline-none focus:border-[#C7A45B] focus:ring-1 focus:ring-[#C7A45B] transition-colors cursor-pointer"
                >
                  {enquiryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] font-sans font-medium text-[#292625] mb-2">
                Message <span className="text-[#D88F91]">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your thoughts, background, or proposal..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F4F1EC] border border-[#756B67]/20 text-xs font-sans text-[#292625] placeholder-[#756B67]/50 focus:outline-none focus:border-[#C7A45B] focus:ring-1 focus:ring-[#C7A45B] transition-colors resize-y"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#292625] text-[#F4F1EC] text-xs uppercase tracking-[0.18em] font-sans font-medium hover:bg-[#3D3937] transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Send Enquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
