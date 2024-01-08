import { useFetch } from "nuxt/app"

const useApiFetch = async (path: any, opts: any) => {
  const config = useRuntimeConfig()
  return await useFetch(path, {
    baseURL: config.public.baseUrl,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    ...opts
  })
}

export {
  useApiFetch
}
