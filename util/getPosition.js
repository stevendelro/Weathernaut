// Returns a object with the browser geolocation coordinates as a promise.
const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export default getPosition
