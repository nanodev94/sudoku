import messages from '@public/locales/en.json'

// Use type safe message keys with `next-intl`
declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages
  }
}

declare module 'next-compose-plugins'
