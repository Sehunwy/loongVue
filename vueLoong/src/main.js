// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import VueWechatTitle from 'vue-wechat-title'
import {get, post} from '@/assets/js/axiosRequest'

Vue.use(VueI18n) // 通过插件的形式挂载
Vue.use(VueWechatTitle)
Vue.config.productionTip = false;
let language = navigator.language?navigator.language:navigator.browserLanguage;
let locale = 'zh';
if(language.indexOf('zh')>-1) {
  locale = 'zh';
}
else if(language.indexOf('en')>-1) {
  locale = 'en';
}
const i18n = new VueI18n({
  locale: locale,    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh': require('@/common/lang/zh'),   // 中文语言包
    'en': require('@/common/lang/en')    // 英文语言包
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {App},
  template: '<App/>'
})

Vue.prototype.goPath = function (name, data) {
  this.$router.push(
    {
      name: name,
      params: data
    }
  );
}

Vue.prototype.get = get;
Vue.prototype.post = post;
