import russianMessages from 'ra-language-russian'

export const ruMessages = {
  ...russianMessages,
  resources: {
    users: {
      name: 'Пользователь |||| Пользователи',
      fields: {
        avatar: 'Аватар',
        password: 'Пароль',
        role: 'Роль',
        email: 'Почта',
        name: 'Имя',
      },
      storage: 'хранилище',
    },
    storage: {
      commonFiles: 'общие файлы',
      myFiles: 'мои файлы'
    },
    permissions: {
      name: 'Разрешения',
      fields: {
        name: 'Имя',
      },
    },
    roles: {
      name: 'Роли',
      create: 'Создать разрешение',
    },
    groups: {
      name: 'Группы',
      fields: {
        name: 'Имя',
        owner: 'Владелец',
        members: 'Члены-группы',
      },
    },
    email: {
      name: 'Почта',
      fields: {
        name: 'Имя',
      },
    },
  },
}

export default ruMessages
