import React, { useState } from 'react'
import { useListContext, useDataProvider } from 'react-admin'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'

const cardWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '5px 0 5px 0',
}

const cardStyles = makeStyles({
  card: {
    height: '20px',
    borderRadius: '5px',
    padding: '5px',
    marginRight: '5px',
    backgroundColor: '#c4d6fb',
  },
})

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'transparent',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'start',
  width: '100%',
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
  return <Card className={classes.card}>{record[source]}</Card>
}

const CardsList = ({ record }) => {
  const { ids, data } = useListContext()
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
    dataProvider.update('roles', {
      id: record.id,
      data: {
        name: record.name,
        permissions: pemissions,
      },
    }).then(setShowBauttonSave(false))
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
    <div style={cardWrapperStyle}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
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
