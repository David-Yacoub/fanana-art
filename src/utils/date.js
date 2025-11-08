const formatter = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

export const format = (isoDate) => {
  try {
    return formatter.format(new Date(isoDate));
  } catch (error) {
    return isoDate;
  }
};
