export const useAuth = () => {
  const authUser =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('authUser')
      : null
  let user = null
  if (authUser) user = JSON.parse(authUser)
  return { user }
}
