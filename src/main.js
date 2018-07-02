import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Header from './components/template/Header.vue'
import Footer from './components/template/Footer.vue'
import Home from './components/users/Home.vue'
import Login from './components/admin/Login.vue'
import Signup from './components/admin/Signup.vue'
import Adminhome from './components/admin/Adminhome.vue'
import Uploadcsv from './components/admin/Uploadcsv.vue'
import Uploadmaterial from './components/admin/Uploadmaterial.vue'
import Uploadimages from './components/admin/Uploadimages.vue'
import Takequiz from './components/admin/Takequiz.vue'
import Requestpassword from './components/admin/password/Requestpassword.vue'
import Responsepassword from './components/admin/password/Responsepassword.vue'
import Routes from './routes'
import VeeValidate from 'vee-validate'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(VueResource);
const router = new VueRouter(
  {
    routes: Routes,
    mode: 'history',
  }
);
Vue.component('app-header', Header);
Vue.component('app-footer', Footer);
Vue.component('app-home', Home);
Vue.component('app-login', Login);
Vue.component('app-signup', Signup);
Vue.component('app-adminhome', Adminhome);
Vue.component('app-uploadcsv', Uploadcsv);
Vue.component('app-uploadmaterial', Uploadmaterial);
Vue.component('app-uploadimages', Uploadimages);
Vue.component('app-takequiz', Takequiz);
Vue.component('app-Requestpassword', Requestpassword);
Vue.component('app-Responsepassword', Responsepassword);
new Vue({
  el: '#app',
  render: h => h(App),
  router: router,



})
