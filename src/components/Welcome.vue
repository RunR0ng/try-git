<script>
    export default{
      name:'welcome',
      props:['msg']
    }
</script>

<template>
  <h1>欢迎界面</h1>
  <router-link to="/login">去登录</router-link>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>