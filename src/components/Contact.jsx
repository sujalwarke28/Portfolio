import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MessageSquare, MapPin, Clock, Sparkles } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = "sujalwarke.dev@gmail.com";

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playSuccess();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#050914] overflow-hidden border-t border-slate-800/80">
      
      {/* Background Lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S BUILD SOMETHING EXTRAORDINARY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get In <span className="text-gradient-cyan">Touch</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-mono mt-2">
            Available for full-time engineering roles, technical advisory, & microservices consulting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Direct Channels */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-heading mb-4">Direct Channels</h3>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Whether you have an architectural opportunity, want to talk about high-frequency backend streaming, or hire me for your engineering team, drop a line!
              </p>

              {/* Copy Email Box */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">Direct Email</span>
                    <span className="text-xs font-mono text-slate-100 font-bold">{emailAddress}</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => sound.playHover()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Status SLAs */}
              <div className="space-y-3 font-mono text-xs text-slate-400 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Avg SLA Response Time: <strong className="text-slate-200">&lt; 4 Hours</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Timezone: <strong className="text-slate-200">UTC-7 / PST (Silicon Valley)</strong></span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-800">
              <a
                href="https://github.com/sujalwarke"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/sujalwarke"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex-1 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto glow-green">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">Message Dispatched!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto font-mono">
                  Thank you! Your inquiry has been routed to Sujal's priority inbox. You will receive a prompt response soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@cyberdyne.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Project Details / Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your tech requirements or role opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Dispatch Message Stream
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
