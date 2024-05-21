import httpInstance from '@/uitls/http';

export function getCategoryAPI() {
    return httpInstance({
        url:'/home/category/head'
    })
}
