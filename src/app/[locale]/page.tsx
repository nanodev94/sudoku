import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations()

  return (
    <div>
      <main>
        <span>{t('test')}</span>
      </main>
    </div>
  )
}
