import { SET_PERSONAL_FILES_LIST } from '@/actions'

const initialState = {
  personalFiles: [],
}

export const filesReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PERSONAL_FILES_LIST:
      return {
        ...state,
        personalFiles: payload,
      }
    default:
      return state
  }
}
