<template>
    <header class="main-header">
  <nav class="navbar navbar-static-top">
    <div class="container">
      <div class="navbar-header">
         <router-link to="/" >
        <a href="" class="navbar-brand">
          <b>Turtle</b>Quiz</a>
          </router-link> 
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
          <i class="fa fa-bars"></i>
        </button>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse " id="navbar-collapse">
        <ul class="nav navbar-nav  pull-right">
          <li>
            <router-link to="/" >Home </router-link>  

           
          </li>
          <li v-if="!checkLogin || checkLogin==undefined " >
           <router-link to="/login" >Login</router-link>

            
          </li>
          <li v-if="checkLogin && checktype=='1' " >
           <router-link to="/admin" >Dashboad</router-link>

            
          </li>
           <li class="dropdown"  v-if="checkLogin && checktype=='1' " >
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Upload <span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li>
                   <router-link to="/upload-questions" >Quiz Questions</router-link>
                </li>
                <li>
                  <router-link to="/upload-materials">Study Materials</router-link>
                </li>
                <li>
                   <router-link to="/upload-images">Images</router-link>
                </li>
                
              </ul>
            </li>
          <li v-if="checkLogin && checktype=='0' " >
           <router-link to="/quiz" >Take Quiz</router-link>

            
          </li>
         
          <li v-if="checkLogin" v-on:click.prevent="logout">
            <a href='#'>Logout

            </a>
          </li>
         


        </ul>

      </div>
      <!-- /.navbar-collapse -->




    </div>
    <!-- /.navbar-custom-menu -->
    <!-- </div> -->
    <!-- /.container-fluid -->
  </nav>
</header>
</template>

<script>
import services from "../../services";
export default {
  props:['checkLogin', 'checktype' ],
  data() {
    return {
      login: null,
    };
  },
  methods:{
    logout(){
      services.removeToken();
      services.removeType();
      this.$router.push('/logout')
    }
  },

  created(){
  
    
  },

  
};
</script>

<style scoped >
</style>
