<template>
    <div class="login-box" style="height: 60vh">
  
  <div class="login-box-body" style="padding-bottom: 20%">
    <p class="login-box-msg">Sign in to start your session</p>

     <div class="alert alert-info  text-center" style="display: none" id='processing'>

      <i class="fa fa-spinner fa-spin" style="font-size:24px"></i> Proccessing...please wait.
    </div>
    <div class="alert alert-success text-center" style="display: none" id='success'>

      {{ message }}
    </div>

     <ul class="bg-danger text-center text-danger list-unstyled" style="margin-bottom: 10px;">
      <li v-for="error in perrors">
        {{ error[1][0]}}
      </li>
    </ul>
    


    <form  @submit.prevent="signupSubmit">
      <div class="form-group   has-feedback" :class="{'has-error': errors.has('email')}">
        <input type="email" class="form-control " placeholder="Email" name="email" v-model="form.email" v-validate="'required|email'">
        <span class="glyphicon glyphicon-envelope form-control-feedback"> </span>
                <small v-if="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</small>
      </div>
      <div class="form-group has-feedback" :class="{'has-error':errors.has('password')}">
      
         <input v-validate="'required|min:6'" name="password" type="password" class="form-control" placeholder="Password" v-model="form.password" >
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
       <small v-if="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</small>
      </div>

       <div class="form-group has-feedback" :class="{'has-error':errors.has('password_confirmation')}">
        <input v-validate="'required|confirmed:password'" name="password_confirmation" type="password" class="form-control" placeholder="Confirm Password" v-model="form.password_confirmation" >
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
         <small v-if="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</small>
      </div>


      <div class="row">

        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat"  v-bind:disabled="errors.any() || !isCompleted" >Sign Up</button>

          
        </div>
        <!-- /.col -->
      </div>
    </form>

  

    <div class='row' style="margin-top: 10%;">
      <div class="col-md-6">
           <router-link to="/login" >Login</router-link>
      </div>
      <div class="col-md-6">
        <router-link to="/signup" class="pull-right " >Register/Sign Up </router-link> 

      </div>
    </div>

    <br>

  </div>
  <!-- /.login-box-body -->
</div>
</template>

<script>
import services from "../../services";
// import Routes from './routes';
export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
        password_confirmation: null
      },
      perrors: null,
      message: null
    };
  },
  methods: {
    signupSubmit() {
      this.perrors = null;
      $("#processing").fadeIn("slow");
      this.message = null;
      $("#success").hide();
      this.$validator.validateAll().then(result => {
        if (result) {
          // console.log('route', this.$route.query.test);
          services
            .signup(this.form)
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
      $("#processing").hide();
      this.perrors = Object.entries(error.body.errors);
      console.log(this.perrors);
    },
    handleSuccess(response) {
      this.form.email = null;
      this.form.password_confirmation = null;
      this.form.password = null;
       this.$validator.reset();
      $("#processing").hide();
      this.message = response.body.message;
      $("#success").fadeIn("slow");
      // console.log(response.body);
    }
  },
  computed: {
    isCompleted() {
      return (
        this.form.email && this.form.password && this.form.password_confirmation
      );
    }
  },
  created() {
    // alert(services.login);
   
    // console.log("route", this.$route.query.test);
  }
};
</script>

<style>
</style>
