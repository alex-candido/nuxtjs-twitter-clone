
const useAuth = () => {

  const login = ({ username, password }: { username: string, password: string }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: {
                        username,
                        password
                    }
                })

                console.log(data.currentUser)
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