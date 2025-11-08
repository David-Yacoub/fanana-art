export const BOOKING_CONFIG = {
  formBaseUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSfnOY2G0RlzpVuwQD9f5NMZnt6WJUMKkFHqTVcse1M4rjZAbQ/viewform',
  entryIds: {
    workshop: 'entry.245361249',
    date: 'entry.372576101',
    time: 'entry.1825110953'
  }
};

export const buildBookingFormUrl = ({ title, date, time }) => {
  if (!title || !date || !time) return BOOKING_CONFIG.formBaseUrl;

  const params = new URLSearchParams({
    usp: 'pp_url',
    [BOOKING_CONFIG.entryIds.workshop]: title,
    [BOOKING_CONFIG.entryIds.date]: date,
    [BOOKING_CONFIG.entryIds.time]: time
  });

  return `${BOOKING_CONFIG.formBaseUrl}?${params.toString()}`;
};

export const parseWorkshopDateTime = (date, time) => {
  if (!date || !time) return null;
  const parsed = new Date(`${date} ${time}`);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
};

