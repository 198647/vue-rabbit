//
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCartstore = defineStore('cart', () => {
    const cartList = ref([])

    const addCart = (goods) => {
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            item.count++
        } else {
            cartList.value.push(goods)
        }
    }
    const delcart = (skuId) => {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
        console.log(cartList.value);
        
    }

    const singleCheck = (skuId,selected)=>{
        const item = cartList.value.find((item) =>  skuId === item.skuId )
        item.selected = selected

    }

    const allCheck = (selected)=>{
        cartList.value.forEach(item => item.selected =selected)
    }

    //计算属性
    const allCount = computed(()=>cartList.value.reduce((a, c)=>a + c.count , 0))
    const allPrice = computed(()=>cartList.value.reduce((a, c)=>a + c.count*c.price , 0))
    const isAll = computed(()=>cartList.value.every((item)=>item.selected))
    return {
        cartList,
        addCart,
        delcart,
        singleCheck,
        allCheck,
        allCount,
        allPrice,
        isAll,
    }
}, {
    persist: true
})