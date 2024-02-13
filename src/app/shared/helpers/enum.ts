export enum Path {
  // home = '/private/home',
  private='private',
  public='public',
  login = 'login',
  signUp = 'sign-up',
  chat = 'chat',
  profile = 'private/profile',
}

export enum Collections {
  // home = '/private/home',
  users = 'users',
  chats = 'chats',
}


export enum ThemesColor {
  first = '00A410',
  secound = 'B68D5C',
  third = '856C3F',
}

export enum Action {
  edit = 'edit',
  delete = 'delete'
}

export enum Toaster {
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

export enum StorageKeys {
  visitorId = 'visitorId',
  user = 'user',
  colorScheme = 'colorScheme',
  token = 'token',
  professions = 'professions',
  firebaseToken = 'firebase_token',
  path = 'path',
  showNotified = 'showNotified',
  configs = 'configs',
  selectedLang = 'selectedLang',
  accessToken = 'accessToken',
  themesColor = 'themesColor',
  deviceId = 'deviceId',
}


export enum UserTypes {
  admin = 'admin',
  user = 'user',
}
