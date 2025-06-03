export const formatDate = (locale: string, dateISOString: string) => {
  return new Date(dateISOString).toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
