import { historyActionTypes } from './action'

const historyInitialState = {
  noHistoryData: true,
  historyList: [],
}

export default function reducer(state = historyInitialState, action) {
  switch (action.type) {
    case historyActionTypes.LOG_LAST_CITY:
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
