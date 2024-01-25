export function getRandomColor() {
  const colors = [
    '#ef4444',
    '#eab308',
    '#10b981',
    '#0ea5e9',
    '#6366f1',
    '#8b5cf6',
  ]

  const randomIndex = Math.floor(Math.random() * colors.length)

  return colors[randomIndex]
}
