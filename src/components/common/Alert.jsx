import React from 'react'
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react'

const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
  ...props
}) => {
  const variants = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-500',
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-500',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle,
      iconColor: 'text-yellow-500',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: XCircle,
      iconColor: 'text-red-500',
    },
  }

  const variant = variants[type]
  const Icon = variant.icon

  return (
    <div
      className={`
        flex items-start gap-3
        p-4 rounded-xl
        border
        ${variant.bg}
        ${variant.border}
        ${className}
      `}
      {...props}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${variant.iconColor} mt-0.5`} />
      <div className="flex-1">
        {title && <h4 className={`font-semibold ${variant.text}`}>{title}</h4>}
        {message && <p className={`text-sm ${variant.text}`}>{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${variant.text} hover:opacity-70 transition-opacity`}
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default Alert
