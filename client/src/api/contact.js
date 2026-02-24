import axiosClient from './axiosClient'

export const submitContact = async (payload) => {
  const { data } = await axiosClient.post('/contact', payload)
  return data
}
