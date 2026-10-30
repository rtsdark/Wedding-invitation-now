import { useState } from 'react';
import { CheckCircle2, Heart, Send, Sparkles, AlertCircle } from 'lucide-react';
import { RsvpSubmission, Blessing } from '../types.ts';

interface RsvpSectionProps {
  onRsvpSuccess: (submission: RsvpSubmission, newBlessing?: Blessing) => void;
}

export default function RsvpSection({ onRsvpSuccess }: RsvpSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes' as 'yes' | 'no',
    guestCount: 2,
    events: ['haldi', 'mehndi', 'sangeet', 'baraat', 'vivah', 'reception'],
    dietPreference: 'Rajasthani Vegetarian Royal Feast',
    blessing: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleEvent = (eventId: string) => {
    if (formData.events.includes(eventId)) {
      setFormData({
        ...formData,
        events: formData.events.filter((e) => e !== eventId),
      });
    } else {
      setFormData({
        ...formData,
        events: [...formData.events, eventId],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');

    const submission: RsvpSubmission = {
      id: `rsvp-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      attending: formData.attending,
      guestCount: formData.attending === 'yes' ? formData.guestCount : 0,
      events: formData.attending === 'yes' ? formData.events : [],
      dietPreference: formData.dietPreference,
      blessing: formData.blessing.trim(),
      createdAt: new Date().toISOString(),
    };

    let blessingObj: Blessing | undefined;
    if (formData.blessing.trim()) {
      blessingObj = {
        id: `b-${Date.now()}`,
        author: formData.name.trim(),
        relation: 'Esteemed Guest',
        message: formData.blessing.trim(),
        city: 'Attending Guest',
        createdAt: new Date().toISOString(),
      };
    }

    // Save in localStorage
    try {
      const existingRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existingRsvps.push(submission);
      localStorage.setItem('wedding_rsvps', JSON.stringify(existingRsvps));
    } catch (e) {
      // ignore storage error
    }

    onRsvpSuccess(submission, blessingObj);
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
            Auspicious Attendance
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF5EE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Response of the Esteemed Guest
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D1C2A5] font-serif leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            Kindly confirm your presence by December 1, 2026 to help us extend the warmest royal hospitality.
          </p>
        </div>

        <div className="rounded-3xl p-6 sm:p-10 md:p-12 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/40 shadow-2xl relative">
          {/* Corner gold borders */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/60 pointer-events-none" />

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#2D0A11] border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37] shadow-lg animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF7ED]">
                Dhanyawaad! Your RSVP is Confirmed
              </h3>
              <p className="text-sm text-[#D1C2A5] font-serif max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[#FFF3B0] font-semibold">{formData.name}</span>. We joyfully anticipate celebrating this divine union together with you in Jaipur!
              </p>
              {formData.blessing && (
                <div className="mt-4 p-4 rounded-xl bg-[#25080E] border border-[#D4AF37]/30 text-xs sm:text-sm font-serif italic text-[#FFF3B0] max-w-lg mx-auto">
                  "{formData.blessing}"
                </div>
              )}
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 text-xs font-serif text-[#D4AF37] border border-[#D4AF37]/40 rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
                >
                  Submit another response
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/50 flex items-center gap-2 text-xs text-red-200">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2 text-center sm:text-left">
                  Will you be able to grace our wedding?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'yes' })}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-serif font-medium border text-center transition-all ${
                      formData.attending === 'yes'
                        ? 'bg-[#3A0F17] text-[#FFF3B0] border-[#D4AF37] shadow-md font-semibold'
                        : 'bg-[#180509] text-[#A69376] border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    Joyfully Accepts
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: 'no' })}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-serif font-medium border text-center transition-all ${
                      formData.attending === 'no'
                        ? 'bg-[#3A0F17] text-[#FFF3B0] border-[#D4AF37] shadow-md font-semibold'
                        : 'bg-[#180509] text-[#A69376] border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    Regretfully Declines
                  </button>
                </div>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-1.5 text-center sm:text-left">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maharaja Vikramaditya / Smt. Ananya Sen"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#150407] border border-[#D4AF37]/30 text-xs sm:text-sm text-[#FAF5EE] placeholder-[#6E5B4B] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-center sm:text-left"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-1.5 text-center sm:text-left">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#150407] border border-[#D4AF37]/30 text-xs sm:text-sm text-[#FAF5EE] placeholder-[#6E5B4B] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-center sm:text-left"
                  />
                </div>
              </div>

              {formData.attending === 'yes' && (
                <>
                  {/* Guest Count */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-1.5 text-center sm:text-left">
                      Number of Guests Attending
                    </label>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, guestCount: num })}
                          className={`w-11 h-10 rounded-lg text-xs font-serif font-medium border transition-all ${
                            formData.guestCount === num
                              ? 'bg-[#D4AF37] text-[#140508] border-[#D4AF37] font-bold shadow'
                              : 'bg-[#150407] text-[#C5B393] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Which ceremonies attending */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-2 text-center sm:text-left">
                      Ceremonies You Plan to Attend
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'haldi', label: 'Mangal Haldi' },
                        { id: 'mehndi', label: 'Rang-e-Mehndi' },
                        { id: 'sangeet', label: 'Jashn-e-Sangeet' },
                        { id: 'baraat', label: 'Shahi Baraat' },
                        { id: 'vivah', label: 'Shubh Vivah' },
                        { id: 'reception', label: 'Royal Banquet' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleEvent(item.id)}
                          className={`py-2 px-3 rounded-lg text-xs font-serif text-left border flex items-center justify-between transition-all ${
                            formData.events.includes(item.id)
                              ? 'bg-[#2E0B12] text-[#FFF3B0] border-[#D4AF37]'
                              : 'bg-[#150407] text-[#8C7A62] border-[#D4AF37]/15'
                          }`}
                        >
                          <span>{item.label}</span>
                          <span className="text-xs text-[#D4AF37]">
                            {formData.events.includes(item.id) ? '✓' : '+'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Preferences */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-1.5 text-center sm:text-left">
                      Culinary &amp; Dietary Preference
                    </label>
                    <select
                      value={formData.dietPreference}
                      onChange={(e) => setFormData({ ...formData, dietPreference: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#150407] border border-[#D4AF37]/30 text-xs sm:text-sm text-[#FAF5EE] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Rajasthani Vegetarian Royal Feast">
                        Rajasthani Vegetarian Royal Feast (Traditional Dal Baati Churma &amp; Delicacies)
                      </option>
                      <option value="Jain Saatvik Cuisine">Jain Saatvik Cuisine (No root vegetables/onion/garlic)</option>
                      <option value="Royal Non-Vegetarian Cuisine">Royal Non-Vegetarian Cuisine (Laal Maas, Safed Maas)</option>
                      <option value="Vegan &amp; Gluten-Free Spread">Vegan &amp; Gluten-Free Gourmet Spread</option>
                    </select>
                  </div>
                </>
              )}

              {/* Heartfelt Blessing */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C5B393] font-medium mb-1.5 text-center sm:text-left">
                  Blessings &amp; Wishes for Devrat &amp; Radhika
                </label>
                <textarea
                  rows={3}
                  value={formData.blessing}
                  onChange={(e) => setFormData({ ...formData, blessing: e.target.value })}
                  placeholder="Share a heartfelt message or blessing to be added to the Royal Blessings Wall..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#150407] border border-[#D4AF37]/30 text-xs sm:text-sm text-[#FAF5EE] placeholder-[#6E5B4B] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#140508] bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Royal RSVP &amp; Blessings</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
