import React from 'react'

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    gray: 'bg-gray-100 text-gray-700',
    white: 'bg-white text-gray-800 border border-gray-200',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  const baseClasses = `
    inline-flex items-center
    font-semibold
    rounded-full
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `

  return (
    <span className={baseClasses} {...props}>
      {children}
    </span>
  )
}

export default Badge
