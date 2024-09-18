import { ofetch } from 'ofetch'
import { toast } from 'sonner'

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE,
  onResponseError: (error) => {
    toast.error(error.response?._data.message)
  }
})
