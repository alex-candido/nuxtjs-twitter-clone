import { UseFetchOptions } from "nuxt/app"

const useFetchApi = async ({ url, options }: { url: string, options: UseFetchOptions<DataTransfer> })  => {
  const { useAuthToken } = useAuth()

  try {
    return await useFetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${useAuthToken().value}`
      }
    })

  } catch (error) {
    console.log(error)
  }
}

export default useFetchApi


