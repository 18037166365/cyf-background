import { http } from '../utils/axios'

export const login = (params) => http.post('/login', params)

export const getUser = (params) => http.get('/getUser', params)

export const getHospitalList = (params) => http.get('/getHospitalList', params)

export const addHospital = (params) => http.post('/addHospital', params)

export const deleteHospital = (params) => http.post('/deleteHospital', params)

export const getNewsList = (params) => http.get('/getNewsList', params)

export const addNews = (params) => http.post('/addNews', params)

export const deleteNews = (params) => http.post('/deleteNews', params)

export const getCaseList = (params) => http.get('/getCaseList', params)

export const addCase = (params) => http.post('/addCase', params)

export const deleteCase = (params) => http.post('/deleteCase', params)


