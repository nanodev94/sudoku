import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  large?: boolean
  onClick?: () => void
  rounded?: boolean
  secondary?: boolean
}

const Button = ({
  children,
  className,
  hoverEffect,
  large,
  onClick,
  rounded,
  secondary,
}: Props) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 cursor-pointer',
        hoverEffect && 'hover:bg-button-hover duration-500',
        large ? 'w-full' : 'w-fit',
        rounded && 'rounded-lg',
        secondary ? 'bg-button-secondary' : 'bg-button-primary',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
