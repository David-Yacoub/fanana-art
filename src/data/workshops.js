export const workshopTypes = [
  'Decoupage',
  'Mixed Media',
  'Seasonal Series',
  'Family Friendly',
  'Custom'
];

export const workshops = [
  {
    id: 'earrings-workshop',
    title: 'Earrings Workshop',
    description:
      'Create your own unique wooden earrings that will complement any outfit and express your personal style.',
    duration: '2 hours',
    price: 65,
    priceDisplay: '65 PLN / 3 pairs of earrings',
    difficulty: 'Beginner',
    type: 'Decoupage',
    highlight: 'For the beginners',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=60',
    ctaLabel: 'Reserve a date',
    ctaDisabledLabel: 'Reserve a date',
    dateTimes: [
      {
        date: '2025-11-19',
        time: '17:30',
        display: 'November 19, 2025 - 17:30-19:30'
      }
    ]
  },
  {
    id: 'candle-holder-workshop',
    title: 'Candle Holder Workshop',
    description:
      "Design your own candle holder that will brighten long winter evenings and add a cozy glow to your home. It's a perfect way to slow down, relax, and create something beautiful -- for yourself or as a gift.",
    duration: '2 hours',
    price: 0,
    priceDisplay: 'To be confirmed',
    difficulty: 'Beginner',
    type: 'Decoupage',
    highlight: 'Reserve a Date',
    image:
      'https://images.unsplash.com/photo-1516054719242-0b76e0d5bbd1?auto=format&fit=crop&w=900&q=60',
    ctaLabel: 'Reserve a date',
    ctaDisabledLabel: 'Reserve a date',
    bookingUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfiqikccQwYxGbdG8LOCpKB9KzWIriDWBS8vajRFQKSv-kmTg/viewform',
    dateTimes: [
      {
        date: null,
        time: null,
        display: '[to be confirmed]'
      }
    ]
  },
  {
    id: 'mixed-media-canvas',
    title: 'Mixed Media Canvas',
    description:
      'Experiment with decoupage, acrylics, and texture paste to craft a layered art canvas filled with personality.',
    duration: '4 hours',
    price: 85,
    difficulty: 'Advanced',
    type: 'Mixed Media',
    highlight: 'Stretch Your Creative Muscles',
    image:
      'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?auto=format&fit=crop&w=900&q=60',
    dateTimes: [
      { date: '2025-01-12', time: '9:30 AM' },
      { date: '2025-02-16', time: '1:00 PM' }
    ]
  },
  {
    id: 'spring-florals-series',
    title: 'Spring Florals Series',
    description:
      'A three-part journey exploring floral decoupage motifs for vases, trays, and wall art.',
    duration: '3 x 2 hours',
    price: 150,
    difficulty: 'Intermediate',
    type: 'Seasonal Series',
    highlight: 'New for the Season',
    image:
      'https://images.unsplash.com/photo-1526481280695-3c4696e38ce7?auto=format&fit=crop&w=900&q=60',
    dateTimes: [
      { date: '2025-03-01', time: '10:00 AM' },
      { date: '2025-03-08', time: '10:00 AM' },
      { date: '2025-03-15', time: '10:00 AM' }
    ]
  },
  {
    id: 'family-collage-workshop',
    title: 'Family Collage Workshop',
    description:
      'A playful family-friendly session crafting memory boards using decoupage techniques and storytelling prompts.',
    duration: '90 minutes',
    price: 35,
    difficulty: 'Beginner',
    type: 'Family Friendly',
    highlight: 'Bring the Kids!',
    image:
      'https://images.unsplash.com/photo-1505744764255-45302db3c6b7?auto=format&fit=crop&w=900&q=60',
    dateTimes: [
      { date: '2024-12-28', time: '4:00 PM' },
      { date: '2025-01-25', time: '11:30 AM' }
    ]
  },
  {
    id: 'christmas-workshops-children',
    title: 'Christmas Workshops for Children',
    description:
      'Christmas workshops for children are a magical opportunity to create beautiful holiday decorations. The sessions spark creativity, bring festive joy, and let kids decorate their homes with their own handmade works of art.',
    duration: '45-60 minutes',
    price: 25,
    priceDisplay: '20-25 PLN',
    pricingDetails: [
      '25 PLN - Decoupage on birch slices',
      '20 PLN - Decoupage on hanging wooden boards'
    ],
    difficulty: 'Beginner',
    type: 'Family Friendly',
    highlight: 'Reserve a Date',
    image: '/images/gallery-love-beyond-words.jpg',
    ctaLabel: 'Reserve a date',
    ctaDisabledLabel: 'Reserve a date',
    dateTimes: [{ date: 'Date to be arranged', time: 'To be arranged' }]
  },
  {
    id: 'wooden-clock-workshop',
    title: 'Wooden Clock Workshop',
    description:
      'Join a creative session where participants decorate a wooden clock using the decoupage technique - combining art, relaxation, and personal style. No experience is needed! We provide all materials, inspiration, and step-by-step guidance. Each participant will take home a functional work of art they designed themselves. Sessions are held in small groups (3-10 people) to ensure a relaxed, creative atmosphere and individual support.',
    duration: '2 hours',
    price: 90,
    priceDisplay: '90 PLN',
    pricingDetails: ['Indicate group size (3-10 people) when booking'],
    difficulty: 'Beginner',
    type: 'Decoupage',
    highlight: 'Small Groups 3-10',
    image: '/images/gallery-rose-clock.jpg',
    ctaLabel: 'Reserve a date',
    ctaDisabledLabel: 'Reserve a date',
    dateTimes: [{ date: 'Date to be arranged', time: 'To be arranged' }]
  },
  {
    id: 'tea-box-workshop',
    title: 'Tea Box Workshop',
    description:
      'Join a special workshop where you will decorate a wooden tea box using the decoupage technique - creating a beautiful and useful item that will brighten your kitchen or become a thoughtful handmade gift. No artistic skills are required - all materials, designs, and step-by-step instructions are provided.',
    duration: '2 hours',
    price: 70,
    priceDisplay: '70-80 PLN',
    pricingDetails: [
      '70 PLN - Box with 4 compartments',
      '80 PLN - Box with 6 compartments'
    ],
    difficulty: 'Beginner',
    type: 'Family Friendly',
    highlight: 'Reserve a Date',
    image: '/images/gallery-floral-box.jpg',
    ctaLabel: 'Reserve a date',
    ctaDisabledLabel: 'Reserve a date',
    dateTimes: [{ date: 'Date to be arranged', time: 'To be arranged' }]
  },
  {
    id: 'custom-workshop-request',
    title: 'Custom Workshop on Request - Discover the Joy of Creating',
    description:
      'During this creative meeting, participants decorate a wooden object using the decoupage technique, giving it a unique character and style. It is a wonderful chance to unwind, relax, and create something beautiful with your own hands. No previous experience is required - all materials, patterns, and individual support are provided. Everyone leaves with a handmade piece that will decorate their home or make a meaningful gift.',
    duration: 'Flexible',
    price: 0,
    priceDisplay: 'Custom pricing',
    difficulty: 'Beginner',
    type: 'Custom',
    highlight: 'Ask for an Offer',
    image: '/images/gallery-marble-box.jpg',
    ctaLabel: 'Ask for an offer',
    ctaDisabledLabel: 'Ask for an offer',
    dateTimes: [{ date: 'Flexible schedule', time: 'To be arranged' }]
  }
];
