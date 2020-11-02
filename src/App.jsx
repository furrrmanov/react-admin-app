import React from 'react'
import { Admin, Resource } from 'react-admin'

import RolesIcon from '@material-ui/icons/Group'
import UserIcon from '@material-ui/icons/Mood'
import PermissionsIcon from '@material-ui/icons/Assignment'
import GroupsIcon from '@material-ui/icons/AllInbox'

import { dataProvider, authProvider } from './utils/firebase/dataProvider'
import Dashboard from './components/Dashboard'
import { UserList, CreateUser, UserEdit } from './components/Users'
import { RolesList, CreateRoles, RolesEdit } from './components/Roles'
import { PermissionsList, CreatePermissions, EditPermissions } from './components/Permissions'
import { GroupList, CreateGroup, EditGroup } from './components/Groups'

export default function App() {
  return (
    <Admin
      dashboard={Dashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}>
      <Resource
        name="users"
        list={UserList}
        create={CreateUser}
        edit={UserEdit}
        icon={UserIcon}
      />
      <Resource
        name="roles"
        list={RolesList}
        icon={RolesIcon}
        create={CreateRoles}
        edit={RolesEdit}
      />
      <Resource
        name="permissions"
        list={PermissionsList}
        icon={PermissionsIcon}
        create={CreatePermissions}
        edit={EditPermissions}
      />
      <Resource
        name="groups"
        list={GroupList}
        icon={GroupsIcon}
        create={CreateGroup}
        edit={EditGroup}
      />
    </Admin>
  )
}
