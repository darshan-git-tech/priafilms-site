import { useQuery } from '@tanstack/react-query'
import { getAbout } from '../api/about'

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: getAbout,
  })
}
