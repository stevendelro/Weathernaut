import axios from 'axios'

// This is needed for useSWR hook in order to make API calls
const fetcher = url => axios.get(url)

export default fetcher
