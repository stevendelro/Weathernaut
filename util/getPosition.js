// Returns a object with the browser geolocation coordinates as a promise.
export const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}