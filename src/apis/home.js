import http from '@/utils/http';

// getBannerAPI 函数定义没有问题
export function getBannerAPI() {
    return http({
        url: '/home/banner'
    });
}

// findNewAPI 函数定义错误修正
export function findNewAPI() {
    return http({
        url: '/home/new'
    });
}
