import { getCategoryAPI } from '@/apis/category';
import { ref, onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

export function useCategory() {
    const categoryData = ref({});

    const route = useRoute();
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id); // 调用正确的 API 函数
        categoryData.value = res.result;
    };


    //目标：路由参数变化的时候，
    onBeforeRouteUpdate((to) => {
        console.log('变化了');
        getCategory(to.params.id)
    })

    onMounted(() => {
        getCategory();
    });

    return{
        categoryData
    }
}