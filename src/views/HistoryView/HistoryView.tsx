'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import BackLink from '@/components/BackLink'
import { PAGE } from '@/constants'
import useHistoryStore from '@/stores/history.store'

import HistoryItem from './components/HistoryItem'

const HistoryView = () => {
  const t = useTranslations('history')
  const { games } = useHistoryStore()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <div className='bg-gray-700 m-auto p-12 my-12 rounded-2xl min-w-full animate-scale md:min-w-160'>
      <BackLink href={PAGE.HOME}>{t('back')}</BackLink>
      <div className='flex flex-col gap-2 pt-8'>
        {games.map(({ id, completed, date }) => (
          <HistoryItem key={id} id={id} date={date} completed={completed} />
        ))}
      </div>
    </div>
  )
}

export default HistoryView
