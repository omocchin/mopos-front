import { useFetch } from "nuxt/app"

const useApiFetch = async (path: any, opts: any) => {
  const config = useRuntimeConfig()
  const companyToken = JSON.parse(localStorage.getItem("auth") || "").token
  const userToken = JSON.parse(localStorage.getItem("user") || "").userToken
  return await useFetch(path, {
    baseURL: config.public.baseUrl,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${companyToken}, ${userToken}`
    },
    ...opts
  })
}

export {
  useApiFetch
}
