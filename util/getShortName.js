const captureFirstStringBeforeComma = str => str.match(/^(.+?)(?=,)/)[0]
const addDashesIfNeeded = str => str.replace(/\ /g, '-')

const getShortName = location => {
  const firstString = captureFirstStringBeforeComma(location)
  const shortWithDashes = addDashesIfNeeded(firstString)
  return shortWithDashes
}

export default getShortName
