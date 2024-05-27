
import { getBannerAPI } from '@/apis/home'
import { ref, onMounted } from 'vue';
export function useBanner() {
    const bannerList = ref([])
    const getBanner = async () => {
        const res = await getBannerAPI({
          distributionSite: '2'
        })
        console.log(res);
        bannerList.value = res.result
      }
      onMounted(() => {
        getBanner(); // 使用 await 关键字
      });
      return{
        bannerList
      }
}