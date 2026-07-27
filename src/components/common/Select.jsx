import React, { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef(({
  label,
  options = [],
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
  placeholder = 'Sélectionner une option',
  ...props
}, ref) => {
  const baseClasses = `
    w-full px-4 py-3 pr-11
    bg-white
    border border-gray-300
    rounded-lg
    text-gray-800
    appearance-none
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : ''}
    ${className}
  `

  const labelClasses = `
    block text-sm font-medium text-gray-700 mb-1
    ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}
  `

  const errorClasses = 'mt-1 text-sm text-red-500'
  const helperClasses = 'mt-1 text-sm text-gray-500'

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id || name} className={labelClasses}>
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={baseClasses}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>

      {error && <p className={errorClasses}>{error}</p>}
      {helperText && !error && <p className={helperClasses}>{helperText}</p>}
    </div>
  )
})

Select.displayName = 'Select'

export default Select
