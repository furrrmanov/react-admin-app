import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@material-ui/core'

import {
  personalFilesListRequest,
  setUploadFileToFirebaseDbRequest,
} from '@/actions/files'
import defaultImg from '@/img/defaultFilesImg.png'

import {
  dataProvider,
  storage,
  authProvider,
} from '@/utils/firebase/dataProvider'

import { useDataProvider } from 'react-admin'

const styles = {
  buttons: {
    marginLeft: '20px',
  },
  input: {
    display: 'none',
  },
  buttonsWrapper: {
    margin: '20px auto',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
  },
  fileListWrapper: {
    display: 'flex',
    justifyContent: 'start',
    marginTop: '20px',
  },
  listItemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '100px',
    maxHeight: '130px',
    marginLeft: '10px',
  },
  listItemImg: {
    height: '100px',
  },
  listItemName: {
    fontSize: '12px',
    textAlign: 'center',
  },
}

export default function PersonalFilesList(props) {
  const dispatch = useDispatch()
  const filesList = useSelector((state) => state.filesList.personalFiles)

  const onChange = async (e) => {
    dispatch(setUploadFileToFirebaseDbRequest(e.target.files[0]))
  }

  const onHandleClickFile = (e) => {
    // const dataProvider = useuseDataProvider()
    // const fileRef = e.target.name
    // console.log(e)
    const storageRef = storage.ref()
    // const storageRef = storage.refFromURL('gs://bucket/1551511801_1.jpg')
    storageRef
      .child('1551511801_1.jpg')
      .getDownloadURL()
      .then(function (url) {
        const xhr = new XMLHttpRequest()
        console.log('>>>>', url)
        xhr.responseType = 'blob'
        xhr.onload = function (event) {
          const blob = xhr.response
        }
        xhr.open('GET', url)
        xhr.send()
      })
      .catch(function (error) {
        // Handle any errors
      })
  }

  useEffect(() => {
    dispatch(personalFilesListRequest())
  }, [dispatch])

  return (
    <div style={styles.buttonsWrapper}>
      <form style={styles.form}>
        <input
          accept="image/*"
          id="outlined-button-file"
          style={styles.input}
          multiple
          type="file"
          onChange={onChange}
        />
        <label htmlFor="outlined-button-file">
          <Button variant="outlined" component="span">
            Upload
          </Button>
        </label>
      </form>
      <div style={styles.fileListWrapper} onClick={onHandleClickFile}>
        {filesList.map((item, index) => {
          return (
            <div key={item.name} style={styles.listItemWrapper}>
              <img
                key={index}
                style={styles.listItemImg}
                src={
                  item.type.split('/')[0] === 'image' ? item.url : defaultImg
                }
                alt="img"
              />
              <span style={styles.listItemName}>{item.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
