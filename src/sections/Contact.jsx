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

    const fallbackLabel = selectedWorkshop.title ?? 'Wybrana oferta';
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
      setFeedbackMessage('Dziękujemy! Wiadomość właśnie do nas dotarła – skontaktujemy się wkrótce.');
      setForm(initialFormState);
    } catch (error) {
      setStatus('error');
      setFeedbackMessage('Ups! Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.');
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <section id="contact" ref={ref} className="mt-24 px-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-brand-ink/10 bg-white/85 p-10 shadow-xl backdrop-blur">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-brand-forest">Kontakt</p>
            <h2 className="font-display text-3xl text-brand-ink sm:text-4xl">
              Gotowi na wspólne tworzenie?
            </h2>
            <p className="text-sm leading-relaxed text-brand-ink/75">
              Napisz, który warsztat Cię zainteresował lub opowiedz o wymarzonym projekcie. Odpowiadamy w ciągu dwóch dni
              roboczych, przesyłając dostępne terminy, listę materiałów i kolejne kroki. Organizujemy również wyjazdowe
              spotkania dla zespołów 3–15 osób na terenie południowej Polski.
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
                Pracownia Fanana-Art, Wisła
              </div>
              <a
                href="https://chat.whatsapp.com/IEiJEn6IXhfLWkDMYJxvOL?mode=wwt"
                className="flex items-center gap-3 rounded-3xl border border-brand-forest/10 bg-brand-cream/70 px-4 py-3 text-sm font-medium text-brand-forest transition hover:border-brand-forest/40"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Dołącz do grupy WhatsApp
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-brand-forest">
                Imię i nazwisko
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Twoje imię i nazwisko"
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
                  placeholder="twojemail@example.com"
                  className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
                />
              </label>
            </div>

            <label className="text-sm font-semibold text-brand-forest">
              Telefon (opcjonalnie)
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+48 ..."
                className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
              />
            </label>

            <label className="text-sm font-semibold text-brand-forest">
              Preferowany warsztat
              <select
                name="preferredWorkshop"
                value={form.preferredWorkshop}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
              >
                <option value="">Dopiero poznaję ofertę</option>
                {mergedWorkshopOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-brand-forest">
              Wiadomość
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Opisz cele, liczbę uczestników lub preferowane terminy."
                className="mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white/90 px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/20"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-brand-forest/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
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
