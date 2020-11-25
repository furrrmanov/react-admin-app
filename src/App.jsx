import React from 'react'
import { Admin, Resource } from 'react-admin'

import RolesIcon from '@material-ui/icons/Group'
import UserIcon from '@material-ui/icons/Mood'
import PermissionsIcon from '@material-ui/icons/Assignment'
import GroupsIcon from '@material-ui/icons/AllInbox'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

import { dataProvider, authProvider } from '@/utils/firebase/dataProvider'
import customRoutes from '@/utils/customRoutes'
import { i18nProvider } from '@/utils/i18nProvider'
import LoginPage from '@/components/Pages/LoginPage'
import Dashboard from '@/components/Dashboard'
import { UserList, CreateUser, UserEdit } from '@/components/Users'
import { RolesList, CreateRoles, RolesEdit } from '@/components/Roles'
import { PermissionsList, CreatePermissions, EditPermissions } from '@/components/Permissions'
import { GroupList, CreateGroup, EditGroup } from '@/components/Groups'
import { EmailList, CreateEmail, EditEmail } from '@/components/Email'
import MyLayout from '@/components/Layout'
import { watchPersonalFilesListRequest, watchUploadFilesRequest } from '@/sagas'
import { filesReduser } from '@/reducer'

export default function App() {
  return (
    <Admin
      customReducers={{filesList: filesReduser}}
      customSagas={[watchPersonalFilesListRequest, watchUploadFilesRequest]}
      layout={MyLayout}
      dashboard={Dashboard}
      customRoutes={customRoutes}
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      loginPage={LoginPage}>
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
      <Resource
        name="email"
        list={EmailList}
        create={CreateEmail}
        edit={EditEmail}
        icon={MailOutlineIcon}
      />
    </Admin>
  )
}
