'use client'

import { useLocale, useTranslations } from 'next-intl'
import clsx from 'clsx'

import { PAGE } from '@/constants'
import { Link } from '@/i18n/navigation'
import { formatDate } from '@/utils/date'

interface Props {
  id: number
  completed: boolean
  date: string
}

const HistoryItem = ({ id, completed, date }: Props) => {
  const locale = useLocale()
  const t = useTranslations('history')

  return (
    <Link href={`${PAGE.HISTORY}/${id}`}>
      <div className='flex flex-col items-start justify-between gap-2 bg-gray-500 p-8 rounded-xl sm:flex-row sm:items-center'>
        <span>
          #{id} - <span>{formatDate(locale, date)}</span>
        </span>
        {completed ? (
          <span
            className={clsx(
              'self-start bg-green-600 py-1 px-8 font-bold rounded-full sm:self-end'
            )}
          >
            {t('completed')}
          </span>
        ) : null}
      </div>
    </Link>
  )
}

export default HistoryItem
