import axios from 'axios'
import store2 from 'store2'

const instance = axios.create({
  // baseURL: 'https://bot.phrynus.cn', // 设置默认的API base URL
  baseURL: 'http://127.0.0.1:3000', // 设置默认的API base URL
  timeout: 10000, // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json'
    // 可以在这里添加其他默认的请求头
  }
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 可以在此处添加全局的请求处理逻辑，例如添加认证信息等
    // 添加Authorization认证信息
    const token = store2.get('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // 可以在此处添加全局的响应处理逻辑，例如处理特定的错误码等
    return response
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance
