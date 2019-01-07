<template>
    <transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
</template>

<script>
export default {
	name: 'App',
	data(){

	}
}
</script>

<style>
#app {
  position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

body {
	margin: 0px;
	padding: 0px;
	/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
	overflow: hidden;
}

</style>
