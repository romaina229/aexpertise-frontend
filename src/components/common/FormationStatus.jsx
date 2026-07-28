import { Clock, CheckCircle, XCircle, Calendar } from 'lucide-react'

const FormationStatus = ({ startDate, endDate, isActive, maxParticipants, currentParticipants }) => {
  const now = new Date()
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : null
  
  // Déterminer le statut
  let status = 'upcoming' // à venir
  let label = 'À venir'
  let icon = Calendar
  let color = 'bg-blue-100 text-blue-700'
  
  if (!isActive) {
    status = 'inactive'
    label = 'Inactive'
    icon = XCircle
    color = 'bg-gray-100 text-gray-700'
  } else if (end && now > end) {
    status = 'expired'
    label = 'Expirée'
    icon = XCircle
    color = 'bg-red-100 text-red-700'
  } else if (now >= start && (!end || now <= end)) {
    status = 'ongoing'
    label = 'En cours'
    icon = CheckCircle
    color = 'bg-green-100 text-green-700'
  } else if (now < start) {
    status = 'upcoming'
    label = 'À venir'
    icon = Calendar
    color = 'bg-yellow-100 text-yellow-700'
  }

  // Vérifier si la formation est complète
  const isFull = currentParticipants >= maxParticipants

  return (
    <div className="flex items-center gap-2">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${color}`}>
        {icon && <icon className="h-3 w-3" />}
        {label}
      </span>
      {isFull && status !== 'expired' && status !== 'inactive' && (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Complet
        </span>
      )}
      {status === 'ongoing' && (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 animate-pulse">
          ● En cours
        </span>
      )}
    </div>
  )
}

export default FormationStatus
