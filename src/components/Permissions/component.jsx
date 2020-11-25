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
  useRedirect,
  useDataProvider,
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

export const CreatePermissions = (props) => {
  const dataProvider = useDataProvider()
  const redirect = useRedirect()

  const url = window.location.toString()
  const parentId = url.split('?')[1]

  const onSuccess = ({ data }) => {
    const { id } = data
    if (!parentId) {
      redirect('/permissions')
      return
    }
    dataProvider.getOne('roles', { id: parentId }).then(async (data) => {
      const role = await data
      role.data.permissions.push(id)

      dataProvider
        .update('roles', {
          id: parentId,
          data: {
            name: role.data.name,
            permissions: role.data.permissions,
          },
        })
        .then(redirect('/roles'))
    })
  }

  return (
    <Create {...props} onSuccess={onSuccess}>
      <SimpleForm redirect="/permissions">
        <TextInput source="name" validate={validateInput} />
      </SimpleForm>
    </Create>
  )
}

export const EditPermissions = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={validateInput} />
    </SimpleForm>
  </Edit>
)
