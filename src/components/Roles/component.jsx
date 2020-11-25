import React from 'react'
import {
  List,
  Create,
  SimpleForm,
  ReferenceArrayInput,
  Edit,
  TextInput,
  required,
  minLength,
  maxLength,
  AutocompleteArrayInput,
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
  EditButton,
} from 'react-admin'

import { useMediaQuery } from '@material-ui/core'

import SimpleAccordion from '@/components/Accordion'
import ParentRelatedSimpleList from '@/components/ReactAdmin/ParentRelatedSimpleList'

const styles = {
  arrayField: {
    marginTop: '10px',
    paddingBottom: '20px',
  },
}

const validateInput = [required(), minLength(2), maxLength(15)]
const requiredSelect = required()

export const RolesList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <List {...props}>
      {isSmall ? (
        <ParentRelatedSimpleList
          linkType={(id) => String}
          tertiaryText={(record) => record.name}
          primaryText={(record) => (
            <>
              <ReferenceArrayField
                style={styles.arrayField}
                linkType="span"
                component="span"
                key={record.name}
                reference="permissions"
                record={record}
                basePath="permissions"
                source="permissions">
                <SingleFieldList
                  component="span"
                  basePath="permissions"
                  key={record.name}>
                  <ChipField source="name" component="span" key={record.name} />
                </SingleFieldList>
              </ReferenceArrayField>
              <EditButton record={record} basePath="permissions" />
            </>
          )}
        />
      ) : (
        <SimpleAccordion {...props}/>
      )}
    </List>
  )
}

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
