<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title=='LoongUI'?'LoongUI':'主页'"/>
  </div>
</template>

<script>
    import iconfont from '@/assets/js/iconfont.js'
    import '@/assets/css/common.css';


    export default {
        name: 'App',
        mounted() {

        }
    }
</script>

<style>
  body, html {
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    color: #333333;
    font-size: 14px;
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  #app {
    width: 100%;
    height: 100%;
    background-color: #E9ECEF;
  }

  ul, li, ol {
    list-style: none;
  }

  p, ul, li, ol {
    margin: 0px;
    padding: 0px;
  }

  router-link {
    text-decoration: none;
  }

  button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent; /* 自定义边框 */
    outline: none; /* 消除默认点击蓝色边框效果 */
  }

  input {
    margin: 0px;
    padding: 0px;
  }
</style>
