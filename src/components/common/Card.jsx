import React from 'react'

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }

  const shadows = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-3xl',
  }

  const baseClasses = `
    bg-white
    ${paddings[padding]}
    ${shadows[shadow]}
    ${roundeds[rounded]}
    transition-all duration-300
    ${hover ? 'hover:shadow-xl hover:-translate-y-1' : ''}
    ${className}
  `

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  )
}

// Sous-composants
Card.Header = ({ children, className = '' }) => (
  <div className={`border-b border-gray-100 pb-4 mb-4 ${className}`}>
    {children}
  </div>
)

Card.Body = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
)

Card.Footer = ({ children, className = '' }) => (
  <div className={`border-t border-gray-100 pt-4 mt-4 ${className}`}>
    {children}
  </div>
)

Card.Title = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-gray-800 ${className}`}>
    {children}
  </h3>
)

Card.Subtitle = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
)

export default Card
