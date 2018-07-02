<template>



<div class="login-box" style="height: 60vh">
  
  <div class="login-box-body" style="padding-bottom: 20%">
    <p class="login-box-msg">Sign in to start your session</p>
     <div class="alert alert-info  text-center" style="display: none" id='processing'>

      <i class="fa fa-spinner fa-spin" style="font-size:24px"></i> Proccessing...please wait.
    </div>
     <ul class="bg-danger text-center text-danger list-unstyled" style="margin-bottom: 10px;">
      <li v-if="perrors">
        {{ perrors}}
      </li>
    </ul>

    <form  @submit.prevent="loginSubmit">
      <div class="form-group   has-feedback" :class="{'has-error': errors.has('email')}">
        <input type="email" class="form-control " placeholder="Email" name="email" v-model="form.email" v-validate="'required|email'">
        <span class="glyphicon glyphicon-envelope form-control-feedback"> </span>
                <small v-if="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</small>
      </div>
      <div class="form-group has-feedback" :class="{'has-error':errors.has('password')}">
        <input type="password" class="form-control" placeholder="Password" name="password" v-model="form.password" v-validate="'required|min:6'"  >
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        <small v-if="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</small>
      </div>


      <div class="row">

        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat"  v-bind:disabled="errors.any() || !isCompleted" >Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

    <div class='row' style="margin-top: 10%;">
      <div class="col-md-6">
         <router-link to="/request-password" >I forgot my password</router-link> 
      </div>
      <div class="col-md-6">
        <router-link to="/signup" class="pull-right " >Register/Sign Up </router-link> 

      </div>
    </div>

    <br>

  </div>
  <!-- /.login-box-body -->
</div>
<!-- </div> -->
</template>

<script>
import services from "../../services";

export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
        verifytoken: null
      },
      perrors: null
    };
  },
  methods: {
    loginSubmit() {
      // $("#err").hide();
      this.perrors = null;
      $("#processing").fadeIn("slow");
      this.form.verifytoken = this.$route.query.token;
      // console.log(this.form.verifytoken);
      this.$validator.validateAll().then(result => {
        if (result) {
          services
            .login(this.form)
            .then(response => {
              this.handleSuccess(response);
            })
            .catch(error => {
              this.handleError(error);
            });
          return;
        }

        alert("Kindly fill all compusory Fields");
      });
    },
    handleError(error) {
      // console.log(error);
      $("#processing").hide();
      this.perrors = error.body.error;
    },
    handleSuccess(response) {
      // console.log(response.body.access_token);
       services.handle(response.body.access_token);
      services.handleAdmin(response.body.isAdmin);
    
    
       this.$router.push("/admin");
     
    
    }
  },
  computed: {
    isCompleted() {
      return this.form.email && this.form.password;
    }
  },
  created() {
    // this.form.verifytoken = this.$route.query.token;
    // console.log(form.verifytoken);
    // console.log(services.isExpired());
    // console.log(services.get());
  },
  mounted(){
    // console.log(services.isExpired());
  },
  
};
</script>
<style scoped >
#app {
  background-color: antiquewhite;
}
</style>
