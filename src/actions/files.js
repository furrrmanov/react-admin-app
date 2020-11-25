export const SET_PERSONAL_FILES_LIST_REQUEST = 'SET_PERSONAL_FILES_LIST_REQUEST'
export const SET_PERSONAL_FILES_LIST = 'SET_PERSONAL_FILES_LIST'
export const SET_UPLOUD_FILES_REQUEST = 'SET_UPLOUD_FILES_REQUEST'

export const personalFilesListRequest = () => ({
  type: SET_PERSONAL_FILES_LIST_REQUEST,
})

export const setPersonalFilesList = (value) => ({
  type: SET_PERSONAL_FILES_LIST,
  payload: value,
})

export const setUploadFileToFirebaseDbRequest = (value) => ({
  type: SET_UPLOUD_FILES_REQUEST,
  value
})
