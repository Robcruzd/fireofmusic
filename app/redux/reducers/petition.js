const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function petition (state = initialState, action) {
  switch (action.type) {
    case 'FETCHING_DATA':
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case 'FETCHING_DATA_SUCCESS':
      return {
        ...state,
        isFetching: true,
        data: action.data,
        point: action.point
      }
    case 'FETCHING_DATA_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
