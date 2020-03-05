<template>
  <div class="nesting">
		<iframe style="height: 100%;width: 100%;" :src="src_path" ></iframe>
  </div>
</template>
<script>
export default {
  name: "government_Clture",
  data() {
    return {
      // http://10.121.128.2:9300/
			src_path: 'https://www.baidu.com/'
    }
  },
  watch: {
	},
  mounted() {
    // this.init()
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.nesting
	width 100%
	height 100%
</style>
