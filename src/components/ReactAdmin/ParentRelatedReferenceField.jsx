import * as React from 'react'
import { Children, cloneElement,memo, } from 'react'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListContextProvider,
  useReferenceArrayFieldController,
} from 'ra-core'


const sanitizeRestProps = ({
  addLabel,
  allowEmpty,
  basePath,
  cellClassName,
  className,
  emptyText,
  formClassName,
  fullWidth,
  headerClassName,
  label,
  linkType,
  link,
  locale,
  record,
  resource,
  sortable,
  sortBy,
  sortByOrder,
  source,
  textAlign,
  translateChoice,
  ...props
}) => props;


const ParentRelatedReferenceField = (props) => {
  const {
    basePath,
    children,
    filter,
    page = 1,
    perPage,
    record,
    reference,
    resource,
    sort,
    source,
  } = props

  if (React.Children.count(children) !== 1) {
    throw new Error(
      '<ReferenceArrayField> only accepts a single child (like <Datagrid>)'
    )
  }
  const controllerProps = useReferenceArrayFieldController({
    basePath,
    filter,
    page,
    perPage,
    record,
    reference,
    resource,
    sort,
    source,
  })
  return (
    <ListContextProvider value={controllerProps}>
      <PureReferenceArrayFieldView {...props} {...controllerProps} />
    </ListContextProvider>
  )
}

ParentRelatedReferenceField.propTypes = {
  // ...fieldPropTypes,
  addLabel: PropTypes.bool,
  basePath: PropTypes.string,
  classes: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  label: PropTypes.string,
  record: PropTypes.any,
  reference: PropTypes.string.isRequired,
  resource: PropTypes.string,
  sortBy: PropTypes.string,
  source: PropTypes.string.isRequired,
}

ParentRelatedReferenceField.defaultProps = {
  addLabel: true,
}

const useStyles = makeStyles(
  (theme) => ({
    progress: { marginTop: theme.spacing(2) },
  }),
  { name: 'RaReferenceArrayField' }
)


export const ReferenceArrayFieldView = (
  props
) => {
  const { children, pagination, className, reference, record, ...rest } = props
  const classes = useStyles(props)

  if (!props.loaded) {
    return <LinearProgress className={classes.progress} />
  }

  return (
    <>
      {cloneElement(Children.only(children), {
        ...sanitizeRestProps(rest),
        className,
        resource: reference,
        record,
      })}{' '}
      {pagination &&
        props.total !== undefined &&
        cloneElement(pagination, sanitizeRestProps(rest))
        }
    </>
  )
}

ReferenceArrayFieldView.propTypes = {
  basePath: PropTypes.string,
  classes: PropTypes.any,
  className: PropTypes.string,
  data: PropTypes.any,
  ids: PropTypes.array,
  loaded: PropTypes.bool,
  children: PropTypes.element.isRequired,
  reference: PropTypes.string.isRequired,
}

const PureReferenceArrayFieldView = memo(ReferenceArrayFieldView)

export default ParentRelatedReferenceField
