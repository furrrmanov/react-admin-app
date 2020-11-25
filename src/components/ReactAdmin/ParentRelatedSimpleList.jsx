import * as React from 'react'
import PropTypes from 'prop-types'

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { linkToRecord, sanitizeListRestProps, useListContext } from 'ra-core'

const useStyles = makeStyles(
  {
    tertiary: { float: 'right', opacity: 0.541176 },
  },
  { name: 'RaSimpleList' }
)

const SimpleList = (props) => {
  const {
    className,
    classes: classesOverride,
    hasBulkActions,
    leftAvatar,
    leftIcon,
    linkType = 'edit',
    primaryText,
    rightAvatar,
    rightIcon,
    secondaryText,
    tertiaryText,
    rowStyle,
    ...rest
  } = props
  const { basePath, data, ids, total } = useListContext(props)
  const classes = useStyles(props)

  return (
    total > 0 && (
      <List className={className} {...sanitizeListRestProps(rest)}>
        {ids.map((id, rowIndex) => (
          <LinkOrNot
            linkType={linkType}
            basePath={basePath}
            id={id}
            key={id}
            record={data[id]}>
            <ListItem
              button={!!linkType}
              style={rowStyle ? rowStyle(data[id], rowIndex) : undefined}>
              {leftIcon && (
                <ListItemIcon>{leftIcon(data[id], id)}</ListItemIcon>
              )}
              {leftAvatar && (
                <ListItemAvatar>
                  <Avatar>{leftAvatar(data[id], id)}</Avatar>
                </ListItemAvatar>
              )}
              <ListItemText component="div"
                primary={
                  <span>
                    {primaryText(data[id], id)}
                    {tertiaryText && (
                      <span className={classes.tertiary}>
                        {tertiaryText(data[id], id)}
                      </span>
                    )}
                  </span>
                }
              secondary={secondaryText && secondaryText(data[id], id)}
              />
              {(rightAvatar || rightIcon) && (
                <ListItemSecondaryAction>
                  {rightAvatar && <Avatar>{rightAvatar(data[id], id)}</Avatar>}
                  {rightIcon && (
                    <ListItemIcon>{rightIcon(data[id], id)}</ListItemIcon>
                  )}
                </ListItemSecondaryAction>
              )}
            </ListItem>
          </LinkOrNot>
        ))}
      </List>
    )
  )
}

SimpleList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  leftAvatar: PropTypes.func,
  leftIcon: PropTypes.func,
  linkType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
  ]),
  primaryText: PropTypes.func,
  rightAvatar: PropTypes.func,
  rightIcon: PropTypes.func,
  secondaryText: PropTypes.func,
  tertiaryText: PropTypes.func,
  rowStyle: PropTypes.func,
}

const useLinkOrNotStyles = makeStyles(
  {
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  { name: 'RaLinkOrNot' }
)

const LinkOrNot = ({
  classes: classesOverride,
  linkType,
  basePath,
  id,
  children,
  record,
}) => {
  const classes = useLinkOrNotStyles({ classes: classesOverride })
  const link = typeof linkType === 'function' ? linkType(record, id) : linkType

  return link === 'edit' || link === true ? (
    <Link to={linkToRecord(basePath, id)} className={classes.link}>
      {children}
    </Link>
  ) : link === 'show' ? (
    <Link to={`${linkToRecord(basePath, id)}/show`} className={classes.link}>
      {children}
    </Link>
  ) : (
    <span>{children}</span>
  )
}

export default SimpleList
