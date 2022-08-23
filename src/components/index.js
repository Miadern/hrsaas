import PageTools from '@/components/PageTools'
import MyTest from '@/components/MyTest'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
import Calandar from '@/components/Calandar'
import radar from '@/components/radar'
import Fullscreen from '@/components/Fullscreen'
import toggleLang from '@/components/toggleLang'

const components = [
  PageTools,
  MyTest,
  UploadExcel,
  UploadImg,
  Calandar,
  radar,
  Fullscreen,
  toggleLang,
]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
