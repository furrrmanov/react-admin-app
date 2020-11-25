import React from 'react'
import {
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
  maxLength,
  ListContextProvider,
  useListController,
} from 'react-admin'

import { useMediaQuery } from '@material-ui/core'

import ParentRelatedSimpleList from '@/components/ReactAdmin/ParentRelatedSimpleList'

const styles = {
  edit: {
    paddingBottom: '20px',
  },
  owner: {
    marginLeft: '20px',
  },
}

const validateInput = [required(), minLength(2), maxLength(15)]
const requiredSelect = required()

export const GroupList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <ListContextProvider value={useListController(props)}>
      {isSmall ? (
        <ParentRelatedSimpleList
          tertiaryText={(record) => (
            <>
              <ReferenceField
                component="span"
                label="resources.groups.fields.owner"
                source="owner"
                record={record}
                basePath="users"
                reference="users">
                <TextField source="name" record={record} component="span" />
              </ReferenceField>
              <TextField
                style={styles.owner}
                source="name"
                record={record}
                component="span"
              />
            </>
          )}
          linkType={(id) => String}
          primaryText={(record) => (
            <>
              <ReferenceArrayField
                style={styles.edit}
                basePath="groups"
                component="span"
                linkType="span"
                label="resources.groups.fields.members"
                reference="users"
                record={record}
                source="users">
                <SingleFieldList basePath="users" component="span">
                  <ChipField source="name" basePath="users" component="span" />
                </SingleFieldList>
              </ReferenceArrayField>
              <EditButton record={record} basePath="groups" />
            </>
          )}
        />
      ) : (
        <Datagrid>
          <TextField source="name" />
          <ReferenceField
            label="resources.groups.fields.owner"
            source="owner"
            reference="users">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceArrayField
            label="resources.groups.fields.members"
            reference="users"
            source="users">
            <SingleFieldList>
              <ChipField source="name" />
            </SingleFieldList>
          </ReferenceArrayField>
          <EditButton />
        </Datagrid>
      )}
    </ListContextProvider>
  )
}

export const CreateGroup = (props) => (
  <Create {...props}>
    <SimpleForm redirect="groups">
      <TextInput source="name" validate={validateInput} />
      <ReferenceInput
        label="owner"
        source="owner"
        reference="users"
        validate={requiredSelect}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceArrayInput
        label="members"
        source="users"
        reference="users"
        validate={requiredSelect}>
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
)

export const EditGroup = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={validateInput} />
      <ReferenceInput
        label="owner"
        source="owner"
        reference="users"
        validate={requiredSelect}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceArrayInput
        label="members"
        source="users"
        reference="users"
        validate={requiredSelect}>
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
)
