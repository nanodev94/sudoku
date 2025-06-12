'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

import Button from '@/components/Button'
import { PAGE } from '@/constants'
import { useRouter } from '@/i18n/navigation'
import useGameStore from '@/stores/game.store'

const HomeView = () => {
  const t = useTranslations('home')
  const { push } = useRouter()

  const {
    actions: { reset },
  } = useGameStore()

  useEffect(() => {
    reset()
  }, [])

  const handlePlayClick = () => push(PAGE.GAME)
  const handleHistoryClick = () => push(PAGE.HISTORY)
  const handleSolveClick = () => push(PAGE.SOLVE)

  return (
    <div className='bg-gray-700 p-16 m-auto max-w-160 w-full h-fit flex flex-col items-center gap-8 rounded-xl animate-scale'>
      <span className='font-bold text-6xl sm:text-8xl'>{t('title')}</span>
      <div className='flex flex-col gap-6 w-60'>
        <Button
          className='text-3xl font-bold py-6'
          hoverEffect
          onClick={handlePlayClick}
          large
          rounded
        >
          {t('play')}
        </Button>
        <Button
          className='text-3xl font-bold py-6'
          hoverEffect
          onClick={handleHistoryClick}
          large
          rounded
        >
          {t('history')}
        </Button>
        <Button
          className='text-3xl font-bold py-6'
          hoverEffect
          onClick={handleSolveClick}
          large
          rounded
        >
          {t('solve')}
        </Button>
      </div>
    </div>
  )
}

export default HomeView
