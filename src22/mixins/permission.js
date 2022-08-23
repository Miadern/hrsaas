import permissionPoints from '@/constant/permission'
export default {
  data() {
    return {
      points: permissionPoints,
    }
  },
  methods: {
    //鉴权函数
    isHas(point) {
      return this.$store.state.permission.point.includes(point)
    },
  },
}
