interface userProps {
  id: string;
  name: string | null;
  email: string;
  username: string;
  profileImage: string | null;
  handle: string;
}

const useAuth = () => {
    const useAuthToken = () => useState('auth_token')
    const useAuthUser = () => useState('auth_user')

    const setToken = ( newToken: string | undefined ) => {
      const authToken = useAuthToken()
      authToken.value = newToken;
    }

    const setUser = ( newUser: userProps | undefined ) => {
      const authUser = useAuthUser()
      authUser.value = newUser;
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

        setToken(request.data.value?.access_token);
        resolve(true)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await refreshToken()

        resolve(true)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }

  return {
    login,
    refreshToken,
    useAuthUser,
    useAuthToken,
    initAuth,
  }
}

export default useAuth;
