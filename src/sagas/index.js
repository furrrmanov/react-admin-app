import { GET_LIST, CREATE } from 'react-admin'
import { takeEvery, put } from 'redux-saga/effects'

import {
  dataProvider,
  storage,
  authProvider,
} from '@/utils/firebase/dataProvider'
import {
  SET_PERSONAL_FILES_LIST_REQUEST,
  SET_UPLOUD_FILES_REQUEST,
  setPersonalFilesList,
} from '@/actions/files'

export function* watchPersonalFilesListRequest() {
  yield takeEvery(SET_PERSONAL_FILES_LIST_REQUEST, workerDataPersonalFilesList)
}

function* workerDataPersonalFilesList() {
  const { email } = yield authProvider.checkAuth()
  const { data } = yield dataProvider(GET_LIST, 'files', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'title', order: 'ASC' },
    filter: { createdby: email },
  })
  const arrayFilesUrls = data.map((item) => {
    return {
      url: item.url,
      type: item.type,
      name: item.name,
    }
  })

  yield put(setPersonalFilesList(arrayFilesUrls))
}

export function* watchUploadFilesRequest() {
  yield takeEvery(SET_UPLOUD_FILES_REQUEST, workerUploadFileToFirebaseDb)
}

function* workerUploadFileToFirebaseDb({ value }) {
  const file = value
  const storageRef = storage.ref()
  const fileRef = storageRef.child(file.name)

  yield fileRef.put(file)

  console.log(file)

  dataProvider(CREATE, 'files', {
    data: {
      url: yield fileRef.getDownloadURL(),
      type: file.type,
      name: file.name,
    },
  })
}
