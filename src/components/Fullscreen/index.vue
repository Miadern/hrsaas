<template>
  <div style="margin: 0 8px">
    <svg-icon
      @click="onfullscreen"
      iconClass="fullscreen"
      className="fullscreen"
    ></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'Fullscreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onfullscreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
        console.log(screenfull.isEnabled)
      }
    },
  },
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
