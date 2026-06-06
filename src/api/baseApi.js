import api from './axiosConfig'

const BaseApi = {
  getAll: async (resource, params = {}) => {
    const data = await api.get(resource, { params })
    return data
  },

  getById: async (resource, id, queryString = "") => {
    const { data } = await api.get(`${resource}/${id}?${queryString}`)
    return data
  },

  create: async (resource, payload) => {
    const res = await api.post(resource, payload)
    return res
  },
  upload: async (resource, formData) => {
    const res = await api.post(resource, formData);
    return res
  },

  update: async (resource, id, payload) => {
    const { data } = await api.put(`${resource}/${id}`, payload)
    return data
  },

  remove: async (resource, id) => {
    const { data } = await api.delete(`${resource}/${id}`)
    return data
  },

  bulkUpdate: async (resource, payload) => {
    const { data } = await api.put(resource, payload)
    return data
  },



}

export default BaseApi
