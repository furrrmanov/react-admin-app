import englishMessages from 'ra-language-english'

export const enMessages = {
  ...englishMessages,
  resources: {
    users: {
      fields: {
        avatar: 'Avatar',
        role: 'Role',
      },
      storage: 'storage',
    },
    storage: {
      commonFiles: 'common files',
      myFiles: 'my files'
    },
    roles: {
      create: 'Create permission',
    },
    groups: {
      fields: {
        owner: 'Owner',
        members: 'Members',
      },
    },
  },
}

export default enMessages
