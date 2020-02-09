import axios from './axios'

export const getCityList = (params) => axios.get('/nc.ms.city.list.get', params)

export const getHospitalList = (params) => axios.get('/nc.ms.hospital.list.get', params)
