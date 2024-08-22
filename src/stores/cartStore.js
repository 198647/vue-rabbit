//
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from './user';
import {insertCartAPI,findNewCartListAPI,delCartAPI} from '@/apis/cart';
export const useCartstore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    const updateNewList = async ()=>{
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    
    const addCart = async (goods) => {
        const {skuId,count} = goods
        if (isLogin.value) {
            await insertCartAPI({skuId,count})
            updateNewList()
        } else {
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                item.count++
            } else {
                cartList.value.push(goods)
            }
        }


    }
    const delcart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            updateNewList()
        } else {
                    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
        console.log(cartList.value);
        }


    }



    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => skuId === item.skuId)
        item.selected = selected

    }

    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }

    //计算属性
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

    const isAll = computed(() => cartList.value.every((item) => item.selected))
    return {
        cartList,
        addCart,
        delcart,
        singleCheck,
        allCheck,
        selectedCount,
        selectedPrice,
        allCount,
        allPrice,
        isAll,
    }
}, {
    persist: true
})