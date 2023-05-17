import { useContext } from "react"
import { AuthContext } from "src/contexts/AuthProvider"


const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth