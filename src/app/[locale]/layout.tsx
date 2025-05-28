import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'

import { TWITTER_DATA } from '@/constants'
import { Link } from '@/i18n/navigation'
import ContextWrapper from '@/wrappers/ContextWrapper'

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
    <ContextWrapper>
      <NextIntlClientProvider>
        <html lang={locale}>
          <body className='flex flex-col min-h-screen'>
            <main className='flex grow p-4'>{children}</main>
            <footer>
              <span>
                @Copyright 2025 -{' '}
                <Link
                  className='font-bold hover:text-link-color'
                  href={TWITTER_DATA.site}
                  target='_blank'
                >
                  {TWITTER_DATA.creator}
                </Link>
              </span>
            </footer>
          </body>
        </html>
      </NextIntlClientProvider>
    </ContextWrapper>
  )
}
