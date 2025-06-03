'use client'

import { useLocale, useTranslations } from 'next-intl'
import clsx from 'clsx'

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
    <div className='flex items-center justify-between bg-gray-500 cursor-default p-8 rounded-xl'>
      <span>
        #{id} - <span>{formatDate(locale, date)}</span>
      </span>
      {completed ? (
        <span
          className={clsx(
            'self-end bg-green-600 py-1 px-8 font-bold rounded-full'
          )}
        >
          {t('completed')}
        </span>
      ) : null}
    </div>
  )
}

export default HistoryItem
