import axios from 'axios'

export default async (req, res) => {
  const latitude = req.query.coords[0]
  const longitude = req.query.coords[1]
  const darkSkiesUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/`

  try {
    const weatherData = await axios.get(
      `${darkSkiesUrl}${latitude},${longitude}?exclude=flags`
    )
    res.status(200).json(weatherData)
  } catch (e) {
    console.error(e)
    res.status(e.status || 400).json({ message: 'Api error' })
  }
}
