const drawerItems = [
  {
    title: 'HOME',
    action: 'url',
    url: '/home',
    icon: 'mdi-home'
  },
  {
    title: 'CLOCK IN/OUT',
    action: 'event',
    value: 'clockInOut',
    icon: 'mdi-clock-edit-outline'
  },
  {
    title: 'LOGOUT',
    action: 'url',
    url: '/auth/login',
    icon: 'mdi-logout-variant'
  }
]

export {
  drawerItems
}