import React, { useState } from "react";
import { Mail, Phone, Send, Sparkles, CheckCircle2, MessageSquare, Globe, ShieldAlert } from "lucide-react";

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-app pt-24 pb-28 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
 
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Contact <span className="text-brand-neon">Admin Team</span>
        </h1>
        <p className="text-text-secondary text-sm max-w-lg mx-auto">
          Have questions about booking code conversion, virtual account deposits, or partnership inquiries? Send us a message directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4 md:col-span-1">
          <div className="bg-surface/60 border border-white/10 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-brand-neon/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/10 border border-brand-neon/30 flex items-center justify-center text-brand-neon group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Direct Admin Email</h4>
              <p className="text-sm font-semibold text-white mt-0.5">support@betforge.app</p>
            </div>
          </div>

          <div className="bg-surface/60 border border-white/10 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-brand-neon/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/10 border border-brand-neon/30 flex items-center justify-center text-brand-neon group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Live Support Hours</h4>
              <p className="text-sm font-semibold text-white mt-0.5">24/7 West Africa Dispatch</p>
            </div>
          </div>

          <div className="bg-surface/60 border border-white/10 rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-brand-neon/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand-neon/10 border border-brand-neon/30 flex items-center justify-center text-brand-neon group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Supported Regions</h4>
              <p className="text-sm font-semibold text-white mt-0.5">Nigeria, Ghana, Kenya, S. Africa</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-surface/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-brand-neon/20 border border-brand-neon rounded-full flex items-center justify-center mx-auto text-brand-neon animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-text-secondary text-xs max-w-sm mx-auto">
                Thank you for reaching out. Our support administrators will review your message and reply to <span className="text-brand-neon font-bold">{email}</span> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="py-2.5 px-6 bg-surface border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-app/80 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-neon"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@domain.com"
                    className="w-full bg-app/80 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-neon"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry regarding SportyBet conversion..."
                  className="w-full bg-app/80 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-neon"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase mb-1.5">Message Content</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or feedback in detail..."
                  className="w-full bg-app/80 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-neon"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-neon hover:bg-brand-neon-hover text-black font-bold text-sm rounded-xl transition-all shadow-lg shadow-brand-neon/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Dispatch Message to Admin
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
