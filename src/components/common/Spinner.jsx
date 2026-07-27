import React from 'react'

const Spinner = ({
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  }

  const colors = {
    primary: 'border-primary',
    white: 'border-white',
    gray: 'border-gray-400',
    accent: 'border-accent',
  }

  const baseClasses = `
    inline-block
    rounded-full
    border-t-transparent
    animate-spin
    ${sizes[size]}
    ${colors[color]}
    ${className}
  `

  return (
    <div className={baseClasses} {...props} />
  )
}

export default Spinner
