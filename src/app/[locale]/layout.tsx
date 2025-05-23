import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'

import '../globals.css'

export const metadata: Metadata = {
  title: 'SUDOKU',
  description: 'Sudoku description',
}

interface Props {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params

  return (
    <NextIntlClientProvider>
      <html lang={locale}>
        <body className='antialiased'>{children}</body>
      </html>
    </NextIntlClientProvider>
  )
}
