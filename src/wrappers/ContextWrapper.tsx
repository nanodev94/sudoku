'use client'

import { useEffect } from 'react'

import { getGamesData, initDB } from '@/indexedDB'
import useHistoryStore from '@/stores/history.store'

interface Props {
  children: React.ReactNode
}

if (typeof window !== 'undefined') {
  await initDB()
}

const ContextWrapper = ({ children }: Props) => {
  const {
    actions: { setGames },
  } = useHistoryStore()

  const initHistory = async () => {
    const games = await getGamesData()
    setGames(games)
  }

  useEffect(() => {
    initHistory()
  }, [])

  return children
}

export default ContextWrapper
