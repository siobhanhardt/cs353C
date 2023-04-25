import axios from 'axios'

// 如果是ts文件可以加上这个接口
// 配置项接口
/**interface AxiosOption {
  baseURL: string
  timeout: number
}*/


// 配置项
//const axiosOption: AxiosOption = { // ts的话使用这个限定类型
const axiosOption = {
  baseURL: 'http://127.0.0.1:9000/',
  // baseURL: '/api',// 配置跨域后可以使用这个/api这个不固定，可以根据自己配置的跨域替换
  timeout: 15000,
}

// 创建一个单例
// 由于实际项目中可能会有多个接口地址
// create可以创建多个实例，在接口中要用几个地址就可以创建几个实例
const instance = axios.create(axiosOption)

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // axios请求前的逻辑处理
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance