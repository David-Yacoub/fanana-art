import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  preferredWorkshop: '',
  message: ''
};

const Contact = forwardRef(({ workshops, selectedWorkshop }, ref) => {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState('idle');

  const workshopOptions = useMemo(
    () =>
      workshops.map((workshop) => ({
        value: workshop.id,
        label: workshop.title
      })),
    [workshops]
  );

  useEffect(() => {
    if (selectedWorkshop) {
      setForm((prev) => ({
        ...prev,
        preferredWorkshop: selectedWorkshop.id
      }));
    }
  }, [selectedWorkshop]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('success');
    setForm(initialFormState);
  };

  return (
    <section id="contact" ref={ref} className="mt-24 px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-brand-ink/10 bg-white/85 p-10 shadow-xl backdrop-blur">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Contact</p>
            <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">
              Ready to craft together?
            </h2>
            <p className="text-sm leading-relaxed text-brand-ink/75">
              Share the workshop that caught your eye or tell us about a custom experience you&apos;re
              envisioning. We reply within two business days with availability, materials lists, and next
              steps. Outgoing sessions for teams of 3-15 makers can also be arranged across southern Poland.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="tel:+48501234567"
                className="flex items-center gap-3 rounded-3xl border border-brand-forest/10 bg-brand-cream/70 px-4 py-3 text-sm font-medium text-brand-forest transition hover:border-brand-forest/40"
              >
                <Phone className="h-5 w-5" />
                +48 501 234 567
              </a>
              <a
                href="mailto:hello@fanana-art.com"
                className="flex items-center gap-3 rounded-3xl border border-brand-forest/10 bg-brand-cream/70 px-4 py-3 text-sm font-medium text-brand-forest transition hover:border-brand-forest/40"
              >
                <Mail className="h-5 w-5" />
                hello@fanana-art.com
              </a>
              <div className="flex items-center gap-3 rounded-3xl border border-brand-forest/10 bg-brand-cream/70 px-4 py-3 text-sm text-brand-ink/80">
                <MapPin className="h-5 w-5 text-brand-forest" />
                Wisla Cultural Atelier, Poland
              </div>
              <a
                href="https://chat.whatsapp.com/FananaArtCommunity"
                className="flex items-center gap-3 rounded-3xl border border-brand-forest/10 bg-brand-cream/70 px-4 py-3 text-sm font-medium text-brand-forest transition hover:border-brand-forest/40"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Join the WhatsApp group
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-brand-forest">
                Name
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="First and last name"
                  className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
                />
              </label>
              <label className="text-sm font-semibold text-brand-forest">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
                />
              </label>
            </div>

            <label className="text-sm font-semibold text-brand-forest">
              Phone
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+48 ..."
                className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
              />
            </label>

            <label className="text-sm font-semibold text-brand-forest">
              Preferred Workshop
              <select
                name="preferredWorkshop"
                value={form.preferredWorkshop}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
              >
                <option value="">I&apos;m exploring options</option>
                {workshopOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-brand-forest">
              Message
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Share goals, group size, or preferred dates."
                className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-forest/90"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>

            {status === 'success' && (
              <p className="text-sm font-medium text-emerald-700">
                Thank you! Your message is on its way. We&apos;ll be in touch shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
