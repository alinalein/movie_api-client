export const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options,
  )
  return formattedDate
}
