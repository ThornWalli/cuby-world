export function detectHour12() {
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric'
  });

  const testDate = new Date(Date.UTC(2020, 0, 1, 13));
  const formatted = formatter.format(testDate);

  return /AM|PM|\b1\b/.test(formatted);
}
