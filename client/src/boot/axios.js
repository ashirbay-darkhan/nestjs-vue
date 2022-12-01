import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:5000' })

api.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
}, error => {
  console.log(error)
})

api.interceptors.response.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
}, error => {
  if (error.response.data.message === 'Token has expired') {
    return axios.post('/auth/refresh', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      localStorage.setItem('token', res.data.access_token)

      error.config.headers.authorization = `Bearer ${res.data.access_token}`

      return api.request(error.config)
    })
  }
})

export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios

  app.config.globalProperties.$api = api
})


export { api }
