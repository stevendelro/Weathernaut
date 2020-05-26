export default function getCardinalDirection(angle) {
  if (typeof angle === 'string') angle = parseInt(angle)
  if (angle <= 0 || angle > 360 || typeof angle === 'undefined') return '☈' //lol
  const arrows = {
    north: 'N ',
    north_east: 'NE ',
    east: 'E ',
    south_east: 'SE ',
    south: 'S ',
    south_west: 'SW ',
    west: 'W ',
    north_west: 'NW ',
  }
  const directions = Object.keys(arrows)
  const degree = 360 / directions.length
  angle = angle + degree / 2
  for (let i = 0; i < directions.length; i++) {
    if (angle >= i * degree && angle < (i + 1) * degree)
      return arrows[directions[i]]
  }
  return arrows['north']
}