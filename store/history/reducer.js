import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { historyActionTypes } from './action'

const historyInitialState = {
  noHistoryData: true,
  historyList: [],
}

export default function reducer(state = historyInitialState, action) {
  const now = moment()
  const getDate = now.format('L')
  const getTime = now.format('LTS')

  switch (action.type) {
    case historyActionTypes.LOG_LAST_CITY:
      
      // Keep search history at last 7 searches
      if (state.historyList.length > 7) {
        return {
          ...state,
          noHistoryData: false,
          historyList: [
            ...state.historyList.splice(0, state.historyList.length - 7),
            {
              key: uuidv4(),
              location: action.payload.location,
              date: getDate,
              timeSearched: getTime,
            },
          ],
        }
      } else {
        return {
          ...state,
          noHistoryData: false,
          historyList: [
            ...state.historyList,
            {
              key: uuidv4(),
              location: action.payload.location,
              timeSearched: getTime,
              date: getDate,
            },
          ],
        }
      }
    default:
      return state
  }
}
