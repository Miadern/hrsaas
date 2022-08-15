import pageTools from '@/components/pageTools'
import uploadExc from '@/components/uploadExc'
import uploadImg from '@/components/uploadImg'

const components = [pageTools, uploadExc, uploadImg]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
