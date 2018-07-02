<template>
  <div >
    <app-header  v-bind:checktype="checktype" v-bind:checkLogin="checkLogin"></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>

window.onunload = function() {
    alert('Bye.');
}
import services from "./services";
export default {
  data() {
    return {
      checkLogin: null,
      checktype:null,
    };
  },
  created(){
     this.checkLogin=services.isloggedIn();
     this.checktype=services.isAdmin();

    //   window.addEventListener('beforeunload', function (event) {
    //    services.removeToken();
    //     services.removeType();
    // }, false)
  },
 updated(){
 
   
    this.checkLogin=services.isloggedIn();
    this.checktype=services.isAdmin();
    // alert( this.checktype);
    // console.log(this.checktype);

  },

  beforeDestroy(){

     
  }

 
};
</script>

<style>
</style>
