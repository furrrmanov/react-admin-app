import React from 'react'
import { useListContext } from 'react-admin'
import { EditButton, TextField, DeleteButton, useTranslate } from 'react-admin'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import PermissionsCardsList from '@/components/RolesPermissionsCard'
import ParentRelatedReferenceField from '@/components/ReactAdmin/ParentRelatedReferenceField'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  detailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonWrapper: {
    marginTop: '10px',
  },
  actionsButton: {
    marginLeft: '10px',
    border: 'none',
    '&:hover': {
      border: 'none',
    },
  },
  summary: {
    margin: '0 auto',
    fontWeight: 'bold',
  },
}))

export default function SimpleAccordion(props) {
  const classes = useStyles()
  const { ids, data } = useListContext()
  const translate = useTranslate()

  return ids.map((id) => {
    return (
      <div className={classes.root} key={id}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <TextField
              className={classes.summary}
              record={data[id]}
              source="name"
              basePath={props.basePath}
            />
          </AccordionSummary>
          <AccordionDetails className={classes.detailsWrapper}>
            <ParentRelatedReferenceField
              label="Permissions"
              reference="permissions"
              record={data[id]}
              source="permissions"
              basePath={props.basePath}>
              <PermissionsCardsList />
            </ParentRelatedReferenceField>
            <div className={classes.buttonWrapper} id={id}>
              <EditButton
                basePath={props.basePath}
                record={data[id]}
                resource="roles"
              />
              <Button
                component={Link}
                to={`${'permissions'}/create?${id}`}
                id="create-permission"
                variant="outlined"
                color="primary"
                className={classes.actionsButton}>
                {translate('resources.roles.create')}
              </Button>
              <DeleteButton
                basePath={props.basePath}
                record={data[id]}
                resource="roles"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  })
}
