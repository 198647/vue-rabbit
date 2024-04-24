import http from '@/uitls/http'

export function getCategoryAPI () {
  return http({
    url: 'home/category/head'
  })
}