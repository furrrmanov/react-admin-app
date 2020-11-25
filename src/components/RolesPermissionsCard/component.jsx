import React, { useState } from 'react'
import { useDataProvider } from 'react-admin'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'

const cardWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'start',
  overflow: 'hidden',
  width: '100%',
}

const cardStyles = makeStyles({
  content: {
    textAlign: 'center',
  },
  card: {
    margin: '8px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    background: '#c1ecff',
    minWidth: '200px',
  },
})

const buttonSaveStyles = {
  icon: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#3f51b5',
    width: '35px',
    height: '30px',
    border: 'none',
    borderRadius: '5px',
    outlineStyle: 'none',
    cursor: 'pointer',
  },
}

const MaterialCardField = ({ record = {}, source }) => {
  const classes = cardStyles()

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>{record[source]}</CardContent>
    </Card>
  )
}

const CardsList = (props) => {
  const { ids, data } = props
  const [showBauttonSave, setShowBauttonSave] = useState(false)
  const [pemissions, setPermissions] = useState(ids)
  const dataProvider = useDataProvider()

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const hadleOnClickButtonSave = () => {
    dataProvider
      .update('roles', {
        id: props.record.id,
        data: {
          name: props.record.name,
          permissions: pemissions,
        },
      })
      .then(setShowBauttonSave(false))
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const permissionsFilteredByIndex = reorder(
      pemissions,
      result.source.index,
      result.destination.index
    )

    setPermissions(permissionsFilteredByIndex)
    setShowBauttonSave(true)
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="grid">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={cardWrapperStyle}
              {...provided.droppableProps}>
              {pemissions.map((id, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <MaterialCardField
                        record={data[id]}
                        source="name"
                        key={id}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {showBauttonSave ? (
        <button
          onClick={hadleOnClickButtonSave}
          style={buttonSaveStyles.button}>
          <SaveIcon style={buttonSaveStyles.icon} />
        </button>
      ) : null}
    </div>
  )
}

export default function PermissionsCardsList(props) {
  return <CardsList {...props} />
}
