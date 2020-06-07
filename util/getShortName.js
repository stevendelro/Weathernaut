const captureFirstStringBeforeComma = str => str.match(/^(.+?)(?=,)/)[0]
const addDashesIfNeeded = str => str.replace(/\ /g, '-')

const getShortName = location => {
  const lowercasedLocation = location.toLowerCase()
  if (lowercasedLocation.includes(',')) {
    const firstString = captureFirstStringBeforeComma(lowercasedLocation)
    const shortWithDashes = addDashesIfNeeded(firstString)
    return shortWithDashes
  } else {
    return lowercasedLocation
  }
}

export default getShortName
