'use client'

import { useTranslations } from 'next-intl'

import Button from '@/components/Button'
import Modal from '@/components/Modal'

interface Props {
  onNoClick?: () => void
  onYesClick?: () => void
}

const ContinueModal = ({ onNoClick, onYesClick }: Props) => {
  const t = useTranslations('game.continueModal')

  return (
    <Modal title={t('title')} hideClose>
      <span>{t('description')}</span>
      <div className='flex gap-4 mt-4'>
        <Button onClick={onYesClick} rounded>
          {t('yesButton')}
        </Button>
        <Button onClick={onNoClick} rounded>
          {t('noButton')}
        </Button>
      </div>
    </Modal>
  )
}

export default ContinueModal
