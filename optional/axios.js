import axios from 'axios'

const instance = axios.create({
  baseURL: '<%= options.baseUrl %>',
  // withCredentials: true
})

instance.interceptors.request.use(
  function (request) {
    return request
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
