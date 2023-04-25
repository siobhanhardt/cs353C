import http from './http'

const login = (data)=>{
    return http.post('/login',data)
}

const getCards = _=>{
    return http.get('/card')
}

const findDeckCards = (data)=>{
    return http.post('/findDeckCards',data)
}

const uploadCard = (data)=>{
    return http.post('/uploadCard',data)
}

export default {
    login,
    getCards,
    findDeckCards,
    uploadCard
}
