'use client'

import { useTranslations } from 'next-intl'

import Modal from '@/components/Modal'

const CompletedModal = () => {
  const t = useTranslations('game.completedModal')

  return (
    <Modal title={t('title')}>
      <span>{t('description')}</span>
    </Modal>
  )
}

export default CompletedModal
