import { ref, onMounted } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  onMounted(async () => {
    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Data stream corrupted. HTTP Status: ${response.status}`)
      }
      
      data.value = await response.json()
    } catch (e) {
      error.value = e.message || 'Unknown deep-space anomaly detected.'
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}