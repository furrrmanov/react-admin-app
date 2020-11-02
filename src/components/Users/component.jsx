import React from 'react'

import {
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
} from 'react-admin'

import MyImageField from './styles'

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


export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <MyImageField label="Avatar" source="pictures[0].src" src="url" title="img" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="password" />
      <ReferenceField label="Role" source="role" reference="roles">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
)

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <ImageInput multiple={true} label="Avatar" source="pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="name" validate={validateFirstName} />
      <TextInput source="email" validate={validateEmail} />
      <TextInput source="password" validate={passwordValidation} />
      <ReferenceInput
        label="Role"
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
      <ImageInput multiple={true} label="Avatar" source="pictures" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="name" validate={validateFirstName} />
      <TextInput source="email" validate={validateEmail} />
      <TextInput source="password" validate={passwordValidation} />
      <ReferenceInput
        label="Role"
        source="role"
        reference="roles"
        validate={InputRequired}>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
