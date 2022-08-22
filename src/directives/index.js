import store from '@/store'
export const imgError = {
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  inserted(el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
}

export const isHas = {
  inserted(el, binding) {
    const has = store.state.permission.point.includes(binding.value)
    if (!has) {
      el.remove()
    }
  },
}
