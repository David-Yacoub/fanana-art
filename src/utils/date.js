const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});

export const format = (isoDate) => {
  try {
    return formatter.format(new Date(isoDate));
  } catch (error) {
    return isoDate;
  }
};
