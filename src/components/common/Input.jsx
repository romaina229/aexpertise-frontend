import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  onFocus,
  name,
  id,
  required = false,
  disabled = false,
  error = '',
  className = '',
  helperText = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  const baseClasses = `
    w-full px-4 py-3
    bg-white
    border border-gray-300
    rounded-lg
    text-gray-800
    placeholder-gray-400
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${Icon && iconPosition === 'left' ? 'pl-11' : ''}
    ${Icon && iconPosition === 'right' ? 'pr-11' : ''}
    ${isPassword ? 'pr-11' : ''}
    ${className}
  `

  const labelClasses = `
    block text-sm font-medium text-gray-700 mb-1
    ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
  `

  const errorClasses = 'mt-1 text-sm text-red-500'
  const helperClasses = 'mt-1 text-sm text-gray-500'

  const handleFocus = (e) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id || name} className={labelClasses}>
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <input
          ref={ref}
          id={id || name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          className={baseClasses}
          {...props}
        />

        {Icon && iconPosition === 'right' && !isPassword && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}

        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error && <p className={errorClasses}>{error}</p>}
      {helperText && !error && <p className={helperClasses}>{helperText}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
