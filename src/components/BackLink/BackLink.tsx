import { IoMdArrowRoundBack } from 'react-icons/io'

import { Link } from '@/i18n/navigation'

interface Props {
  children: React.ReactNode
  href: string
}

const BackLink = ({ children, href }: Props) => {
  return (
    <Link className='flex items-center gap-2' href={href}>
      <IoMdArrowRoundBack size={25} />
      <span className='text-lg'>{children}</span>
    </Link>
  )
}

export default BackLink
