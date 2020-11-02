import React from 'react'

import {
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  Edit,
  EditButton,
  required,
  maxLength,
  regex,
} from 'react-admin'

const validateInput = [
  required(),
  maxLength(50),
  regex(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u, 'invalid name'),
]


export const PermissionsList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
)

export const CreatePermissions = (props) => (
  <Create {...props}>
    <SimpleForm redirect="/permissions">
      <TextInput source="name" validate={validateInput}/>
    </SimpleForm>
  </Create>
)

export const EditPermissions = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={validateInput}/>
    </SimpleForm>
  </Edit>
)
