import axios from 'axios'

// If it is a ts file, you can add this interface
// configuration item interface
/**interface AxiosOption {
   baseURL: string
   timeout: number
}*/


// configuration item
//const axiosOption: AxiosOption = { // Use this limited type for ts
const axiosOption = {
    baseURL: 'http://127.0.0.1:9000/',
    // baseURL: '/api', // You can use this after configuring cross-domain /api This is not fixed, you can replace it according to your own configured cross-domain
    timeout: 15000,
}

// create a singleton
// Since there may be multiple interface addresses in the actual project
// create can create multiple instances, and several instances can be created by using several addresses in the interface
const instance = axios. create(axiosOption)

// add request interceptor
instance.interceptors.request.use(
    function (config) {
        // Logic processing before axios request
        return config
    },
    function (error) {
        // do something about request errors
        return Promise. reject(error)
    }
)

// add response interceptor
instance.interceptors.response.use(
    function (response) {
        // do something with the response data
        return response.data
    },
    function (error) {
        // do something with response errors
        return Promise. reject(error)
    }
)

export default instance