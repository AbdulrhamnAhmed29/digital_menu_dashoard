import api from '../../../api/axiosConfig'
import Cookies from 'js-cookie'
const authService = {
  login: async (credentials) => {
    const { data } = await api.post('/auth/local', credentials)
    return data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    Cookies.remove("jwt")
  },
}

export default authService