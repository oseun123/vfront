<template>
 <div class="content-wrapper" style="height: 80vh" >
     <section class="content-header text-center ">
      <h1>
        Upload Quiz
       
      </h1>
      
    </section>
      <section class="content">
          
         <div class="container">

      <div class="col-md-6 col-md-offset-3 ">
                 
       <!-- general form elements -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">Quiz App with Vue</h3>
               <div class="alert alert-info  text-center" style="display: none" id='processing'>

                   <i class="fa fa-spinner fa-spin" style="font-size:24px"></i> Proccessing...please wait.
               </div>
               <div class="alert alert-success text-center" style="display: none" id='success'>

                 {{ message }}
                </div>

                <ul class="bg-danger text-center text-danger list-unstyled" style="margin-bottom:     10px;">
                     <li v-if="perrors">
                   {{ perrors}}
                 </li>
             </ul>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form  @submit.prevent="uploadSubmit">
              <div class="box-body">
                <div class="form-group">
                  <label for="quiz_questions" >Quiz Questions File</label>
                  <input type="file" id="quiz_questions" name="quiz_questions" v-validate="{ mimes: ['application/vnd.ms-excel'] }"  v-on:change="onFileSelected"  >
                  <small v-if="errors.has('quiz_questions')" class="help is-danger">{{ errors.first('quiz_questions') }}</small>

                 
                </div>
                
              </div>
              <!-- /.box-body -->

              <div class="box-footer">
                <button type="submit"  v-bind:disabled="errors.any() || !isCompleted "  class="btn btn-primary">Upload</button>
              </div>
            </form>
          </div>
          <!-- /.box -->
             </div>
         </div>
      </section>
      </div>
</template>

<script>
import services from "../../services";
export default {
 data() {
    return {
      form: {
        selectedFile:null,
      },
      perrors: null,
      message: null,
    };
  },
   methods: {
     onFileSelected(event){

      this.form.selectedFile= event.target.files[0];

      // console.log(this.form.selectedFile);
     },
     uploadSubmit() {
      // $("#err").hide();
      this.perrors = null;
      $("#processing").fadeIn("slow");
      this.$validator.validateAll().then(result => {
        if (result) {
          const fd= new FormData();
          fd.append('csv',this.form.selectedFile );
          services
            .upload(fd)
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
      console.log(error.body.message);
      if (error.body.message) {
        this.perrors=error.body.message
      } else {
        
        this.perrors = error.body.error;
      }
      $("#processing").hide();
    },

    handleSuccess(response) {
    $("#processing").hide();
      // console.log(response.body);
        this.form.selectedFile=null;
        this.$validator.reset();
       this.message = response.body.data;
      $("#success").fadeIn("slow");
      

   }

   },

   computed: {
    isCompleted() {
      return this.form.selectedFile;
    },




  
},
}
</script>

<style>
</style>
