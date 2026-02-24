import axiosClient from './axiosClient'

export const getAbout = async () => {
  const { data } = await axiosClient.get('/about')
  return data
}
