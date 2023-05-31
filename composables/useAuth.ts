import jwt_decode from "jwt-decode";

interface userProps {
  id: string;
  name: string | null;
  email: string;
  username: string;
  profileImage: string | null;
  handle: string;
}

const useAuth = () => {
    const useAuthToken = () => useState<string | undefined>('auth_token')
    const useAuthUser = () => useState('auth_user')
    const useAuthLoading = () => useState('auth_loading', () => true)

    const setToken = ( newToken: string | undefined ) => {
      const authToken = useAuthToken()
      authToken.value = newToken;
    }

    const setUser = ( newUser: userProps | undefined ) => {
      const authUser = useAuthUser()
      authUser.value = newUser;
    }

    const setIsAuthLoading = (value: boolean) => {
        const authLoading = useAuthLoading()
        authLoading.value = value
    }

  const login = ({ username, password }: { username: string, password: string }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = await useFetch('/api/auth/login', {
           method: 'POST',
           body: {
            username,
            password
           }
        })

        console.log(request.data.value)

        setToken(request.data.value?.access_token);
        setUser(request.data.value?.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {

      try {
        const request = await useFetch('/api/auth/refresh', { method: 'GET' })

        console.log(request.data.value?.access_token)
        setToken(request.data.value?.access_token);
        resolve(true)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const request = await useFetch('/api/auth/user', { method: 'GET' })

        console.log(request.data.value?.user)

        setUser(request.data.value?.user);
        resolve(true)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()

    if (!authToken.value) {
        return
    }

    const jwt = jwt_decode<any>(authToken.value)

    const newRefreshTime = jwt.exp - 60000

    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime);
  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setIsAuthLoading(true)
      try {
        await refreshToken()
        await getUser()

        reRefreshAccessToken()

        resolve(true)
      } catch (error) {
        console.log(error)
        reject(error)
      } finally {
        setIsAuthLoading(false)
      }
    })
  }

  return {
    login,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading,
  }
}

export default useAuth;
