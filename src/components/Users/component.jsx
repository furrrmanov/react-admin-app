import React from 'react'
import { Link } from 'react-router-dom'
import {
  useTranslate,
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  EmailField,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  Edit,
  EditButton,
  email,
  required,
  minLength,
  maxLength,
  regex,
  ImageField,
  ImageInput,
  SimpleList,
} from 'react-admin'

import { useMediaQuery } from '@material-ui/core'
import { Button } from '@material-ui/core'

import MyImageField from './styles'

const styles = {
  textField: {
    marginLeft: '10px',
  },
  storageButton: {
    border: 'none',
    '&:hover': {
      border: 'none',
    },
  },
}

const validateEmail = [email(), required()]
const validateFirstName = [
  required(),
  minLength(2),
  maxLength(25),
  regex(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u, 'invalid name'),
]
const passwordValidation = [
  regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'invalid password'),
  required(),
]
const InputRequired = required()

export const UserList = (props) => {
  const translate = useTranslate()
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  return (
    <List {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => (
            <>
              <EmailField source="email" record={record} />
              <TextField
                style={styles.textField}
                source="password"
                record={record}
              />
            </>
          )}
          linkType={(id) => String}
          tertiaryText={(record) => (
            <>
              <ReferenceField
                label="resources.users.fields.role"
                source="role"
                record={record}
                basePath="roles"
                reference="roles">
                <TextField source="name" />
              </ReferenceField>
              <EditButton record={record} basePath="users" />
            </>
          )}
          leftAvatar={(record) => (
            <MyImageField
              label="resources.users.fields.avatar"
              source="pictures[0].src"
              record={record}
              src="url"
              title="img"
            />
          )}
        />
      ) : (
        <Datagrid>
          <MyImageField
            label="resources.users.fields.avatar"
            source="pictures[0].src"
            src="url"
            title="img"
          />
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="password" />
          <ReferenceField
            label="resources.users.fields.role"
            source="role"
            reference="roles">
            <TextField source="name" />
          </ReferenceField>
          <>
            <EditButton />
            <Button
              component={Link}
              to="storage"
              variant="outlined"
              color="primary"
              style={styles.storageButton}>
              {translate('resources.users.storage')}
            </Button>
          </>
        </Datagrid>
      )}
    </List>
  )
}

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <ImageInput
        multiple={true}
        label="avatar"
        source="pictures"
        accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="name" validate={validateFirstName} />
      <TextInput source="email" validate={validateEmail} />
      <TextInput source="password" validate={passwordValidation} />
      <ReferenceInput
        label="role"
        source="role"
        reference="roles"
        validate={InputRequired}>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const CreateUser = (props) => (
  <Create {...props}>
    <SimpleForm redirect="/users">
      <ImageInput
        multiple={true}
        label="avatar"
        source="pictures"
        accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="name" validate={validateFirstName} />
      <TextInput source="email" validate={validateEmail} />
      <TextInput source="password" validate={passwordValidation} />
      <ReferenceInput
        label="role"
        source="role"
        reference="roles"
        validate={InputRequired}>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
