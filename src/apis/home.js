import http from '@/uitls/http';

export function getBannerAPI(){
    return http({
        url:'/home/banner'
    })
}