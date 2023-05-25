
const useAuth = () => {

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
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    login
  }
}

export default useAuth;