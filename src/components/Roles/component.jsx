import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  ReferenceArrayInput,
  Edit,
  EditButton,
  TextInput,
  required,
  minLength,
  maxLength,
  AutocompleteArrayInput,
} from 'react-admin'

import PermissionsCardsList from '../RolesPermissionsCard'
import  ParentRelatedReferenceField  from '../ReactAdmin/ParentRelatedReferenceField'

const validateInput = [required(), minLength(2), maxLength(15)]
const requiredSelect = required()

export const RolesList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <ParentRelatedReferenceField
        label="Permissions"
        reference="permissions"
        source="permissions">
        <PermissionsCardsList />
      </ParentRelatedReferenceField> 
      <EditButton />
    </Datagrid>
  </List>
)

export const RolesEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={validateInput} />
      <ReferenceArrayInput
        fullWidth
        label="Permission"
        source="permissions"
        reference="permissions"
        validate={requiredSelect}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
)

export const CreateRoles = (props) => (
  <Create {...props}>
    <SimpleForm redirect="/roles">
      <TextInput source="name" validate={validateInput} />
      <ReferenceArrayInput
        fullWidth
        label="Permission"
        source="permissions"
        reference="permissions"
        validate={requiredSelect}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
)
