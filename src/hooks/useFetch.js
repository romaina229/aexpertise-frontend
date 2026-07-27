import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

/**
 * Hook personnalisé pour effectuer des requêtes API
 * @param {string} url - L'URL de l'API à appeler
 * @param {object} options - Options de la requête
 * @param {boolean} options.manual - Si true, la requête ne sera pas exécutée automatiquement
 * @param {object} options.params - Paramètres de la requête
 * @param {object} options.headers - Headers supplémentaires
 * @param {boolean} options.cache - Mettre en cache les données
 * @param {number} options.cacheTime - Durée du cache en millisecondes
 * @returns {object} { data, loading, error, refetch, setData }
 */
export function useFetch(url, options = {}) {
  const {
    manual = false,
    params = {},
    headers = {},
    cache = false,
    cacheTime = 300000, // 5 minutes par défaut
  } = options

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(!manual)
  const [error, setError] = useState(null)
  const [cacheKey] = useState(() => `${url}_${JSON.stringify(params)}`)

  // Cache en mémoire
  const cacheStore = useCallback(() => {
    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem(`api_cache_${cacheKey}`)
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < cacheTime) {
          return cachedData
        }
        sessionStorage.removeItem(`api_cache_${cacheKey}`)
      }
    }
    return null
  }, [cacheKey, cacheTime])

  const fetchData = useCallback(async (customOptions = {}) => {
    try {
      setLoading(true)
      setError(null)

      // Vérifier le cache
      if (cache) {
        const cachedData = cacheStore()
        if (cachedData) {
          setData(cachedData)
          setLoading(false)
          return cachedData
        }
      }

      // Construire l'URL avec les paramètres
      let fullUrl = url
      if (Object.keys(params).length > 0 || Object.keys(customOptions.params || {}).length > 0) {
        const allParams = { ...params, ...customOptions.params }
        const queryString = new URLSearchParams(allParams).toString()
        fullUrl = `${url}?${queryString}`
      }

      // Faire la requête
      const response = await api.get(fullUrl, {
        headers: { ...headers, ...customOptions.headers },
      })

      // Mettre en cache
      if (cache) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(
            `api_cache_${cacheKey}`,
            JSON.stringify({
              data: response.data,
              timestamp: Date.now(),
            })
          )
        }
      }

      setData(response.data)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Une erreur est survenue'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [url, params, headers, cache, cacheKey, cacheStore])

  // Exécuter la requête au montage
  useEffect(() => {
    if (!manual) {
      fetchData()
    }
  }, [fetchData, manual])

  // Fonction pour recharger les données
  const refetch = useCallback((newOptions = {}) => {
    // Supprimer le cache pour forcer un rechargement
    if (cache && typeof window !== 'undefined') {
      sessionStorage.removeItem(`api_cache_${cacheKey}`)
    }
    return fetchData(newOptions)
  }, [fetchData, cache, cacheKey])

  return {
    data,
    loading,
    error,
    refetch,
    setData,
  }
}

/**
 * Hook pour les requêtes POST/PUT/DELETE
 * @param {string} url - L'URL de l'API
 * @returns {object} { execute, loading, error, data }
 */
export function useMutation(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = useCallback(
    async (method = 'POST', payload = {}, options = {}) => {
      try {
        setLoading(true)
        setError(null)

        const response = await api({
          method,
          url,
          data: payload,
          headers: options.headers || {},
          params: options.params || {},
        })

        setData(response.data)
        return response.data
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Une erreur est survenue'
        setError(errorMessage)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [url]
  )

  const post = useCallback((payload = {}, options = {}) => execute('POST', payload, options), [execute])
  const put = useCallback((payload = {}, options = {}) => execute('PUT', payload, options), [execute])
  const patch = useCallback((payload = {}, options = {}) => execute('PATCH', payload, options), [execute])
  const del = useCallback((options = {}) => execute('DELETE', null, options), [execute])

  return {
    data,
    loading,
    error,
    execute,
    post,
    put,
    patch,
    delete: del,
  }
}

export default useFetch
