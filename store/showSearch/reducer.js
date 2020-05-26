import { showSearchActionTypes } from './action'

const showSearchInitialState = {
  needsSearchPage: true,
}

export default function reducer(state = showSearchInitialState, action) {
  switch (action.type) {
    case showSearchActionTypes.SEARCH_PAGE_DISPLAYED:
      return {
        ...state,
        needsSearchPage: false,
      }
    default:
      return state
  }
}
