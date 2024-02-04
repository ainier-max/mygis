<template>
  <div id="app" style="height: 100%;overflow-y: hidden" >
    <transition style="height:100%" name="fade" mode="out-in">
      <router-view style="height:100%"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {
    }
  }
</script>

<style lang="scss">
  *{ margin:0;padding:0; }
  html,body{
     width: 100%;
     height: 100%;
    }
  #app{
    width:100%;
    height: 100%;
  }
</style>

