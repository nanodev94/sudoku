'use client'

import { useTranslations } from 'next-intl'

import useGameStore from '@/stores/game.store'

const MovementsDisplay = () => {
  const t = useTranslations()
  const { movements } = useGameStore()

  return (
    <p className='text-xl font-bold py-5'>
      {t('movements')} {movements}
    </p>
  )
}

export default MovementsDisplay
