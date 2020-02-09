<template>
  <div id="app">
    <van-notice-bar :text="title" left-icon="volume-o" />
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
		return {
      title: '强烈建议用户，在前往发热门诊或定点医院前，先向各自社区、各地疾控中心、卫健委或其他相关部门报备或咨询。'
		}
	},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 10px; */
}
</style>
