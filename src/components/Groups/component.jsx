import React from 'react'

import {
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  Edit,
  SelectInput,
  ReferenceArrayInput,
  EditButton,
  SelectArrayInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  ReferenceField,
  required,
  minLength,
  maxLength
} from 'react-admin'

const validateInput = [required(), minLength(2), maxLength(15)]
const requiredSelect = required()

export const GroupList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="group-name" />
      <ReferenceField label="Owner" source="owner" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceArrayField label="Members" reference="users" source="users">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <EditButton />
    </Datagrid>
  </List>
)

export const CreateGroup = (props) => (
  <Create {...props}>
    <SimpleForm redirect="groups">
      <TextInput source="group-name" validate={validateInput}/>
      <ReferenceInput label="Owner" source="owner" reference="users" validate={requiredSelect}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceArrayInput label="Members" source="users" reference="users" validate={requiredSelect}>
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
)

export const EditGroup = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="group-name" validate={validateInput}/>
      <ReferenceInput label="Owner" source="owner" reference="users" validate={requiredSelect}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceArrayInput label="Members" source="users" reference="users" validate={requiredSelect}>
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
)
