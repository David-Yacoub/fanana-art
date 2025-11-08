const WhatsappIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M20.52 3.48A11.77 11.77 0 0 0 12 0C5.38 0 0 5.26 0 11.75c0 2.07.55 4.06 1.6 5.82L0 24l6.31-1.65a11.93 11.93 0 0 0 5.69 1.41h.01c6.62 0 12-5.26 12-11.75 0-3.14-1.25-6.08-3.48-8.53zM12 21.2h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.75.98 1-3.59-.24-.37a9.42 9.42 0 0 1-1.47-5.11c0-5.19 4.25-9.41 9.47-9.41 2.53 0 4.91.99 6.7 2.79a9.37 9.37 0 0 1 2.78 6.68c0 5.19-4.25 9.41-9.46 9.41z" />
    <path d="M17.19 13.66c-.29-.14-1.72-.85-1.99-.95-.27-.1-.46-.14-.65.14-.19.29-.75.95-.92 1.15-.17.19-.34.22-.63.07-.29-.14-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.44.12-.59.13-.13.29-.31.43-.47.14-.17.19-.29.29-.48.1-.19.05-.35-.02-.5-.07-.14-.66-1.59-.91-2.18-.24-.58-.49-.5-.66-.51h-.56c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.41 0 1.41 1.03 2.77 1.17 2.96.14.19 2.01 3.08 4.88 4.32.68.29 1.21.46 1.61.59.68.22 1.28.19 1.77.12.54-.08 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.26-.19-.55-.33z" />
  </svg>
);

const FloatingChat = () => (
  <a
    href="https://chat.whatsapp.com/IEiJEn6IXhfLWkDMYJxvOL?mode=wwt"
    target="_blank"
    rel="noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-transparent px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-2xl transition hover:brightness-95"
    style={{ backgroundColor: '#25D366' }}
    aria-label="Join the Fanana-Art WhatsApp group"
  >
    <WhatsappIcon className="h-5 w-5" />
    <span className="hidden sm:inline">Join the group</span>
  </a>
);

export default FloatingChat;
