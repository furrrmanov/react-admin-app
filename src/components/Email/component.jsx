import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  email,
  Edit,
  EditButton,
  required,
} from 'react-admin'

const validateEmail = [email(), required()]


export const EmailList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="email" />
      <EditButton />
    </Datagrid>
  </List>
)

export const CreateEmail = (props) => (
  <Create {...props}>
    <SimpleForm redirect="/email">
      <TextInput source="email" validate={validateEmail} />
    </SimpleForm>
  </Create>
)

export const EditEmail = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="email" validate={validateEmail} />
    </SimpleForm>
  </Edit>
)
