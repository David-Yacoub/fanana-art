const BASE_FORM_URL =
  'https://docs.google.com/forms/d/1A8ES_lu8QJdf_iab0S2g92UMzk0jTP1pk6DZoWuHXg4/viewform';

const dateTimeFormatter = new Intl.DateTimeFormat('pl-PL', {
  timeZone: 'Europe/Warsaw',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

export const formatPlDateTime = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.valueOf())) {
    return '';
  }

  return dateTimeFormatter.format(date).replace(',', '').replace(/\s+/g, ' ').trim();
};

export const encode = (value) => encodeURIComponent(value ?? '');

export const buildBookingUrl = ({ title, dateIso, city }) => {
  if (!title || !dateIso) {
    return '';
  }

  const date = new Date(dateIso);
  if (Number.isNaN(date.valueOf())) {
    return '';
  }

  const formattedDate = formatPlDateTime(date);
  if (!formattedDate) {
    return '';
  }

  const titleParam = `entry.170014957=${encode(title)}`;
  const dateParam = `entry.1744906145=${encode(formattedDate)}`;
  const cityParam = `entry.1762235425=${encode(city ?? '')}`;

  return `${BASE_FORM_URL}?${titleParam}&${dateParam}&${cityParam}`;
};

export const pickUpcomingDate = (event) => {
  if (!event) return null;

  const now = new Date();

  if (Array.isArray(event.schedules) && event.schedules.length > 0) {
    const parsedSchedules = event.schedules
      .map((iso) => {
        const date = new Date(iso);
        return Number.isNaN(date.valueOf()) ? null : { iso, date };
      })
      .filter(Boolean);

    if (parsedSchedules.length === 0) {
      return null;
    }

    const future = parsedSchedules
      .filter(({ date }) => date > now)
      .sort((a, b) => a.date - b.date);

    if (future.length > 0) {
      return future[0].iso;
    }

    const sorted = parsedSchedules.sort((a, b) => a.date - b.date);
    return sorted[sorted.length - 1].iso;
  }

  if (event.start) {
    const startDate = new Date(event.start);
    if (!Number.isNaN(startDate.valueOf())) {
      return startDate.toISOString();
    }
  }

  return null;
};
