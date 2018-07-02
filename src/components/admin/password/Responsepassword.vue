<template>
     <div class="login-box" style="height: 60vh">
  
  <div class="login-box-body" style="padding-bottom: 20%">
    <p class="login-box-msg"> Reset your Password</p>
     <div class="alert alert-info  text-center" style="display: none" id='processing'>

      <i class="fa fa-spinner fa-spin" style="font-size:24px"></i> Proccessing...please wait.
    </div>

    <div class="alert alert-success text-center" style="display: none" id='success'>

      {{ message }}
    </div>

     <ul class="bg-danger text-center text-danger list-unstyled" style="margin-bottom: 10px;">
      <li v-if="perrors">
        {{ perrors}}
      </li>
    </ul>

    <form  @submit.prevent="ResponseSubmit">
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
          <button type="submit" class="btn btn-primary btn-block btn-flat"  v-bind:disabled="errors.any() || !isCompleted" >Send Link</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

   

    <br>

  </div>
  <!-- /.login-box-body -->
</div>
</template>

<script>
import services from "../../../services";
export default {
     data() {
    return {
      form: {
        email: null,
        password: null,
        password_confirmation: null,
        verifytoken: null
      },
      perrors: null,
      message:null,
    };
  },
   methods: {
    ResponseSubmit() {
      // $("#err").hide();
      this.perrors = null;
       $("#success").hide();
      $("#processing").fadeIn("slow");
      this.form.verifytoken = this.$route.query.token;
      // console.log(this.form.verifytoken);
      this.$validator.validateAll().then(result => {
        if (result) {
          services
            .changePassword(this.form)
            .then(response => {
              this.handleSuccess(response);
            })
            .catch(error => {
              this.handleError(error);
            });

        console.log(this.form);

          return;
        }

        alert("Kindly fill all compusory Fields");
      });
    },
    handleError(error) {
      console.log(error);
      $("#processing").hide();
     this.perrors = error.body.error;
    },
    handleSuccess(response) {
       this.form.email = null;
       this.form.password = null;
       this.form.password_confirmation = null;
       this.$validator.reset();
       $("#processing").hide();
       this.message = response.body.data;
      $("#success").fadeIn("slow");
        // console.log(response);
    }
  },
    computed: {
    isCompleted() {
      return this.form.email && this.form.password  && this.form.password_confirmation;
    }
  },

}
</script>

<style>

</style>
