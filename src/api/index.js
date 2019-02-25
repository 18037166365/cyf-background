import { http } from '../utils/axios'

console.log('http')
console.log(http)
export const getUser = (params) => http.get('/getUser', params)

export const getHospitalList = (params) => http.get('/getHospitalList', params)

export const addHospital = (params) => http.post('/addHospital', params)

export const deleteHospital = (params) => http.post('/deleteHospital', params)

export const getNewsList = (params) => http.get('/getNewsList', params)

export const addNews = (params) => http.post('/addNews', params)

export const deleteNews = (params) => http.post('/deleteNews', params)

export const login = (params) => http.post('/login', params)

