export const showSearchActionTypes = {
  SEARCH_PAGE_DISPLAYED: 'SEARCH_PAGE_DISPLAYED',
}

export const showSearch = () => dispatch => {
  return dispatch({
    type: 'SEARCH_PAGE_DISPLAYED',
  })
}
