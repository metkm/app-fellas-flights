import { ofetch } from 'ofetch'

export const apiFetch = ofetch.create({
  baseURL: process.env.API_BASE,
  headers: {
    app_id: process.env.APPLICATION_ID!,
    app_key: process.env.APPLICATION_KEY!,
    Accept: 'application/json',
    resourceVersion: 'v4',
  },
})
