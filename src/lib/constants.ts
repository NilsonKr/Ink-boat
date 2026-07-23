//AUTH

export const AUTH_ROUTES = ['/login', '/register', '/recovery-password']

export const PUBLIC_ROUTES = ['/', ...AUTH_ROUTES]

//EDITOR

export const HIGHLIGHT_COLORS: { name: string; value: string }[] = [
  { name: 'marigold', value: '#f1cf6f' },
  { name: 'plum', value: '#ead8e0' },
  { name: 'sage', value: '#cfe0c9' },
  { name: 'sky', value: '#d6e2ec' },
]
