'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { getGamesData, initDB } from '@/indexedDB'
import useHistoryStore from '@/stores/history.store'

interface Props {
  children: React.ReactNode
}

if (typeof window !== 'undefined') {
  await initDB()
}

const ContextWrapper = ({ children }: Props) => {
  const t = useTranslations()
  const [loading, setLoading] = useState(true)

  const {
    actions: { setGames },
  } = useHistoryStore()

  const initHistory = async () => {
    const games = await getGamesData()
    setGames(games)
    setLoading(false)
  }

  useEffect(() => {
    initHistory()
  }, [])

  if (loading) return <span>{t('loading')}</span>

  return children
}

export default ContextWrapper
