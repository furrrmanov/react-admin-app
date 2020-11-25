import * as React from 'react'
import { Login, useDataProvider } from 'react-admin'
import { Field, Form } from 'react-final-form'

import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslate, useLogin, useNotify, useSafeSetState } from 'ra-core'

const useStyles = makeStyles(
  (theme) => ({
    form: {
      padding: '0 1em 1em 1em',
    },
    input: {
      marginTop: '1em',
    },
    button: {
      width: '100%',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  }),
  { name: 'RaLoginForm' }
)

const Input = ({
  meta: { touched, error },
  input: inputProps,
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
)

const LoginForm = (props) => {
  const { redirectTo } = props
  const [loading, setLoading] = useSafeSetState(false)
  const login = useLogin()
  const translate = useTranslate()
  const notify = useNotify()
  const classes = useStyles(props)
  const dataProvider = useDataProvider()

  const validate = (values) => {
    const errors = { username: undefined, password: undefined }

    if (!values.username) {
      errors.username = translate('ra.validation.required')
    }
    if (!values.password) {
      errors.password = translate('ra.validation.required')
    }
    return errors
  }

  const getEmailListfromFirebseDb = () => {
    const emailList = dataProvider
      .getList('email', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'title', order: 'ASC' },
      })
      .then(async (promise) => await promise)

    return emailList
  }

  const submit = (values) => {
    getEmailListfromFirebseDb().then(({ data }) => {
      if (data.some((item) => item.email === values.username)) {
        setLoading(true)
        login(values, redirectTo)
          .catch((error) => {
            setLoading(false)
            notify(
              typeof error === 'string'
                ? error
                : typeof error === 'undefined' || !error.message
                ? 'ra.auth.sign_in_error'
                : error.message,
              'warning'
            )
          })
          .finally(setLoading(false))
      } else {
        notify('No access')
      }
    })
  }

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                autoFocus
                id="username"
                name="username"
                component={Input}
                label={translate('ra.auth.username')}
                disabled={loading}
              />
            </div>
            <div className={classes.input}>
              <Field
                id="password"
                name="password"
                component={Input}
                label={translate('ra.auth.password')}
                type="password"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
          </div>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              className={classes.button}>
              {loading && (
                <CircularProgress
                  className={classes.icon}
                  size={18}
                  thickness={2}
                />
              )}
              {translate('ra.auth.sign_in')}
            </Button>
          </CardActions>
        </form>
      )}
    />
  )
}

const LoginPage = (props) => {
  return (
    <Login {...props}>
      <LoginForm />
    </Login>
  )
}

export default LoginPage
