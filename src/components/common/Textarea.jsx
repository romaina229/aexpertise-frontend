import React, { forwardRef } from 'react'

const Textarea = forwardRef(({
  label,
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
  rows = 4,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)

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
    resize-y
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

      <textarea
        ref={ref}
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        rows={rows}
        className={baseClasses}
        {...props}
      />

      {error && <p className={errorClasses}>{error}</p>}
      {helperText && !error && <p className={helperClasses}>{helperText}</p>}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
