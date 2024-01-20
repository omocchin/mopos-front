import { useFetch } from "nuxt/app"

const useApiFetch = async (path: any, opts: any) => {
  const config = useRuntimeConfig()
  const token = JSON.parse(localStorage.getItem("auth") || "").token 
  return await useFetch(path, {
    baseURL: config.public.baseUrl,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`
    },
    ...opts
  })
}

export {
  useApiFetch
}
