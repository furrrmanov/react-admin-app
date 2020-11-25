import React, { useState } from 'react'
import { useTranslate } from 'react-admin'

import { Button } from '@material-ui/core'

import PersonalFilesList from '@/components/PersonalFilesList'

const styles = {
  wrapper: {
    margin: '0 auto',
  },
  buttons: {
    marginLeft: '20px',
  },
  buttonsWrapper: {
    marginTop: '20px',
  },
}

export default function StoragePage(props) {
  const translate = useTranslate()
  const [showFilesList, setShowFilesList] = useState(true)

  const onHandleClickCommonFiles = () => {
    setShowFilesList(false)
  }

  const onHandleClickMyFiles = () => {
    setShowFilesList(true)
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.buttonsWrapper}>
        <Button
         style={styles.buttons}
          variant="outlined"
          color="primary"
          onClick={onHandleClickCommonFiles}>
          {translate('resources.storage.commonFiles')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          style={styles.buttons}
          onClick={onHandleClickMyFiles}>
          {translate('resources.storage.myFiles')}
        </Button>
        <hr></hr>
      </div>
      {showFilesList ? <PersonalFilesList /> : null}
    </div>
  )
}
