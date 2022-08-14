import pageTools from '@/components/pageTools'
import uploadExc from '@/components/uploadExc'

const components = [pageTools, uploadExc]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}
