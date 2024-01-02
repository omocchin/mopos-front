import { useFetch } from "nuxt/app"

export const useApiFetch = async (path: any, opts: any) => {
  const config = useRuntimeConfig()
  console.log(config.public.baseUrl)
  console.log('opts', ...[opts])
  return await useFetch(path, {
    baseURL: config.public.baseUrl,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    ...opts
  })
}