const BASE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfnOY2G0RlzpVuwQD9f5NMZnt6WJUMKkFHqTVcse1M4rjZAbQ/viewform';

const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
  timeZone: 'Europe/Warsaw',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

const timeFormatter = new Intl.DateTimeFormat('pl-PL', {
  timeZone: 'Europe/Warsaw',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

const formatPlDate = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.valueOf())) {
    return '';
  }

  return dateFormatter.format(date);
};

const formatPlTime = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.valueOf())) {
    return '';
  }

  return timeFormatter.format(date);
};

export const buildBookingUrl = ({ title, dateIso }) => {
  if (!title || !dateIso) {
    return '';
  }

  const date = new Date(dateIso);
  if (Number.isNaN(date.valueOf())) {
    return '';
  }

  const formattedDate = formatPlDate(date);
  if (!formattedDate) {
    return '';
  }

  const formattedTime = formatPlTime(date);

  const params = new URLSearchParams();
  params.set('usp', 'pp_url');
  params.set('entry.245361249', title);
  params.set('entry.372576101', formattedDate);
  if (formattedTime) {
    params.set('entry.1825110953', formattedTime);
  }

  return `${BASE_FORM_URL}?${params.toString()}`;
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
