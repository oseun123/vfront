<template>
    <div class="login-box" style="height: 60vh">
  
  <div class="login-box-body" style="padding-bottom: 20%">
    <p class="login-box-msg">Enter your Email to get Reset Link</p>
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

    <form  @submit.prevent="RequestSubmit">
      <div class="form-group   has-feedback" :class="{'has-error': errors.has('email')}">
        <input type="email" class="form-control " placeholder="Email" name="email" v-model="form.email" v-validate="'required|email'">
        <span class="glyphicon glyphicon-envelope form-control-feedback"> </span>
                <small v-if="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</small>
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
       
      },
      perrors: null,
      message:null,
    };
  },
   methods: {
    RequestSubmit() {
      // $("#err").hide();
      this.perrors = null;
       $("#success").hide();
      $("#processing").fadeIn("slow");
    //   this.form.verifytoken = this.$route.query.token;
      // console.log(this.form.verifytoken);
      this.$validator.validateAll().then(result => {
        if (result) {
          services
            .sendPasswordResetLink(this.form)
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
      console.log(error);
      $("#processing").hide();
     this.perrors = error.body.error;
    },
    handleSuccess(response) {
       this.form.email = null;
       this.$validator.reset();
       $("#processing").hide();
       this.message = response.body.data;
      $("#success").fadeIn("slow");
    }
  },
    computed: {
    isCompleted() {
      return this.form.email ;
    }
  },

}
</script>

<style>

</style>
