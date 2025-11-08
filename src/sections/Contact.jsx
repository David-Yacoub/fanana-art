import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

const FORM_ENDPOINT = 'https://formspree.io/f/xnnlaplq';

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
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const workshopOptions = useMemo(
    () =>
      workshops.map((workshop) => ({
        value: workshop.id,
        label: workshop.title
      })),
    [workshops]
  );

  const mergedWorkshopOptions = useMemo(() => {
    if (!selectedWorkshop?.id) {
      return workshopOptions;
    }

    const alreadyListed = workshopOptions.some((option) => option.value === selectedWorkshop.id);
    if (alreadyListed) {
      return workshopOptions;
    }

    const fallbackLabel = selectedWorkshop.title ?? 'Selected offer';
    return [
      {
        value: selectedWorkshop.id,
        label: fallbackLabel
      },
      ...workshopOptions
    ];
  }, [selectedWorkshop, workshopOptions]);

  useEffect(() => {
    if (selectedWorkshop?.id) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setStatus('success');
      setFeedbackMessage('Thank you! Your message just reached us and we will reply shortly.');
      setForm(initialFormState);
    } catch (error) {
      setStatus('error');
      setFeedbackMessage('Oops! Something went wrong. Please try again or reach out directly.');
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <section id="contact" ref={ref} className="mt-24 px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-brand-ink/10 bg-white/85 p-10 shadow-xl backdrop-blur">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Contact</p>
            <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">
              Ready to create together?
            </h2>
            <p className="text-sm leading-relaxed text-brand-ink/75">
              Tell us which workshop caught your attention or describe your dream project. We reply within two business days
              with available dates, a materials list, and clear next steps. We also organize off-site sessions for teams of
              3-15 people across southern Poland.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="tel:+48881937943"
                className="flex items-center gap-3 rounded-3xl border border-brand-forest/10 bg-brand-cream/70 px-4 py-3 text-sm font-medium text-brand-forest transition hover:border-brand-forest/40"
              >
                <Phone className="h-5 w-5" />
                +48 881 937 943
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
                Fanana-Art Studio, Wisla
              </div>
              <a
                href="https://chat.whatsapp.com/IEiJEn6IXhfLWkDMYJxvOL?mode=wwt"
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
                Full name
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
                />
              </label>
              <label className="text-sm font-semibold text-brand-forest">
                E-mail
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
              Phone (optional)
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+48 ..."
                className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
              />
            </label>

            <label className="text-sm font-semibold text-brand-forest">
              Preferred workshop
              <select
                name="preferredWorkshop"
                value={form.preferredWorkshop}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
              >
                <option value="">Still exploring the offer</option>
                {mergedWorkshopOptions.map((option) => (
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
                placeholder="Describe your goals, group size, or preferred dates."
                className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-forest/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>

            {status === 'success' && (
              <p className="text-sm font-medium text-emerald-700" role="status">
                {feedbackMessage}
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm font-medium text-rose-700" role="alert">
                {feedbackMessage}
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
