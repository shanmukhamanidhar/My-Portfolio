import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    soundFx.playClick(850, 0.03);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick(700, 0.04);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundFx.playClick(950, 0.06);
    }, 1000);
  };

  return (
    <section id="contact" className="pt-24 sm:pt-32 pb-36 sm:pb-44 relative overflow-hidden">
      {/* Background Soft Orange Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#FF6A00]/[0.05] rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Strict Two-Column Grid: minmax(0, 1fr) minmax(0, 1fr) on Desktop, 1fr on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Monumental Editorial Statement & Channels */}
          <div 
            className="w-full min-w-0 space-y-8"
            style={{ overflow: 'visible', minWidth: 0 }}
          >
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#FF6A00]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]"></span>
              <span>07 // CONTACT</span>
            </div>

            {/* Monumental Editorial Heading - Geometrically constrained inside left column */}
            <h2 
              className="w-full max-w-full text-4xl sm:text-5xl lg:text-[clamp(2.5rem,3.4vw,4rem)] xl:text-[clamp(2.75rem,3.6vw,4.25rem)] font-black tracking-tighter text-[#F5F5F5] light:text-[#111111] font-display uppercase leading-[0.92] select-none"
              style={{ maxWidth: '100%' }}
            >
              LET'S<br />
              BUILD<br />
              SOMETHING<br />
              <span className="text-[#FF6A00]">GREAT.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#A0A0A0] light:text-[#6B6B6B] leading-relaxed max-w-lg font-normal">
              I’m open to discussions about software engineering opportunities, technical internships, research, projects, and collaborations.
            </p>

            {/* Direct Communication Channels */}
            <div className="space-y-4 pt-4 border-t border-white/[0.08] light:border-black/[0.08] font-mono text-xs">
              {/* Email Line */}
              <div className="flex items-center justify-between py-3 border-b border-white/[0.08] light:border-black/[0.08]">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#A0A0A0] light:text-[#6B6B6B] uppercase block">DIRECT EMAIL //</span>
                  <span className="text-sm font-semibold text-[#F5F5F5] light:text-[#111111] select-all">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 border border-white/[0.1] light:border-black/[0.1] hover:border-[#FF6A00] text-[#A0A0A0] light:text-[#6B6B6B] hover:text-[#FF6A00] uppercase text-[11px] transition-colors flex items-center gap-1.5"
                >
                  {copiedEmail ? <Check size={12} className="text-[#FF6A00]" /> : <Copy size={12} />}
                  <span>{copiedEmail ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>

              {/* LinkedIn & GitHub Links */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group py-3 border-b border-white/[0.08] light:border-black/[0.08] flex items-center justify-between hover:border-[#FF6A00] transition-colors"
                >
                  <div>
                    <span className="text-[10px] text-[#A0A0A0] light:text-[#6B6B6B] uppercase block">NETWORK //</span>
                    <span className="text-sm font-bold text-[#F5F5F5] light:text-[#111111] group-hover:text-[#FF6A00] transition-colors">LinkedIn</span>
                  </div>
                  <ArrowUpRight size={14} className="text-[#A0A0A0] light:text-[#6B6B6B] group-hover:text-[#FF6A00] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group py-3 border-b border-white/[0.08] light:border-black/[0.08] flex items-center justify-between hover:border-[#FF6A00] transition-colors"
                >
                  <div>
                    <span className="text-[10px] text-[#A0A0A0] light:text-[#6B6B6B] uppercase block">SOURCE //</span>
                    <span className="text-sm font-bold text-[#F5F5F5] light:text-[#111111] group-hover:text-[#FF6A00] transition-colors">GitHub</span>
                  </div>
                  <ArrowUpRight size={14} className="text-[#A0A0A0] light:text-[#6B6B6B] group-hover:text-[#FF6A00] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Dispatch Form */}
          <div 
            className="w-full min-w-0 border border-white/[0.08] light:border-black/[0.08] bg-white/[0.015] light:bg-black/[0.015] p-6 sm:p-10 space-y-6 box-border"
            style={{ width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box' }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] light:border-black/[0.08] font-mono text-xs">
              <span className="text-[#FF6A00] uppercase tracking-widest font-semibold">TRANSMIT DISPATCH //</span>
              <span className="text-[#A0A0A0] light:text-[#6B6B6B]">[ DIRECT MESSAGE ]</span>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 font-mono animate-fade-in">
                <div className="w-12 h-12 border border-[#FF6A00] text-[#FF6A00] flex items-center justify-center mx-auto">
                  <Check size={22} />
                </div>
                <h4 className="text-lg font-bold text-white light:text-[#111111] font-display uppercase tracking-tight">
                  Dispatch Transmitted
                </h4>
                <p className="text-xs text-[#A0A0A0] light:text-[#6B6B6B] max-w-sm mx-auto">
                  Thank you. Your message has been received. I will review and reply within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 border border-white/[0.1] light:border-black/[0.1] hover:border-[#FF6A00] text-xs uppercase tracking-wider text-white light:text-[#111111] transition-colors"
                >
                  Transmit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs" style={{ width: '100%', boxSizing: 'border-box' }}>
                <div className="space-y-2">
                  <label className="text-[#A0A0A0] light:text-[#6B6B6B] uppercase tracking-wider block text-[11px]">
                    01 / NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                    className="w-full box-border px-4 py-3 bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.1] light:border-black/[0.1] text-sm text-[#F5F5F5] light:text-[#111111] placeholder-[#555555] light:placeholder-[#999999] focus:outline-none focus:border-[#FF6A00] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[#A0A0A0] light:text-[#6B6B6B] uppercase tracking-wider block text-[11px]">
                    02 / EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                    className="w-full box-border px-4 py-3 bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.1] light:border-black/[0.1] text-sm text-[#F5F5F5] light:text-[#111111] placeholder-[#555555] light:placeholder-[#999999] focus:outline-none focus:border-[#FF6A00] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[#A0A0A0] light:text-[#6B6B6B] uppercase tracking-wider block text-[11px]">
                    03 / MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, opportunity, or collaboration..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                    className="w-full box-border px-4 py-3 bg-white/[0.02] light:bg-black/[0.02] border border-white/[0.1] light:border-black/[0.1] text-sm text-[#F5F5F5] light:text-[#111111] placeholder-[#555555] light:placeholder-[#999999] focus:outline-none focus:border-[#FF6A00] transition-colors resize-none h-[130px]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#FF6A00] hover:bg-[#FF7A18] text-white font-mono uppercase font-bold tracking-widest text-xs transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:ring-offset-2 focus:ring-offset-[#080808] light:focus:ring-offset-white"
                >
                  <span>{isSubmitting ? 'TRANSMITTING...' : "SEND MESSAGE ↗"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
