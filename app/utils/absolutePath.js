export default function(path) {
  const base = __BASE_URL__ || ''

  return `${base}${path}`
}
