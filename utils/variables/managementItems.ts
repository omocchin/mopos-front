const managementItems = [
  {
    title: 'HOME',
    action: 'url',
    url: '/management/home',
    icon: 'mdi-home'
  },
  {
    title: 'USERS',
    action: 'url',
    url: '/management/users',
    icon: 'mdi-account'
  },
  {
    title: 'PRODUCTS',
    action: 'url',
    url: '/management/products',
    icon: 'mdi-package'
  },
  {
    title: 'SIGNOUT',
    action: 'event',
    value: 'signout',
    icon: 'mdi-logout'
  }
]

export {
  managementItems
}