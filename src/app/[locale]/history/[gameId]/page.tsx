import HistoryGameView from '@/views/HistoryGameView'

interface Props {
  params: Promise<{
    gameId: string
  }>
}

export default async function HistoryGame({ params }: Props) {
  const { gameId } = await params

  return <HistoryGameView gameId={parseInt(gameId)} />
}
