<template>
 <div class="content-wrapper" style="height: 80vh" >
     <section class="content-header text-center ">
      <h1>
        Upload Images
       
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
            <form  @submit.prevent="uploadImagesSubmit">
              <div class="box-body">
                <div class="form-group">
                  <label for="images" >Images</label>
                  <input type="file" id="images" name="images[]"  accept="image/*"  v-validate="{ mimes: ['image/jpeg','image/png'] }"  v-on:change="onFileSelected"  multiple  >
                  <small v-if="errors.has('images[]')" class="help is-danger">{{ errors.first('images[]') }}</small>

                 
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
    // const formData = new FormData();

      this.form.selectedFile= event.target.files;

 


    //  this.form.selectedFile.forEach((element, index, array) => {
    //   formData.append('image-' + index, element);
    // });
      console.log(formData);

     },
     uploadImagesSubmit() {
      // $("#err").hide();
      this.perrors = null;
      $("#processing").fadeIn("slow");
      this.$validator.validateAll().then(result => {
        if (result) {

        const fd= new FormData();
            
        const imagesloop = this.form.selectedFile;
        for (var i = 0; i < imagesloop.length; i++){
    
            fd.append('images[]', imagesloop[i]);
        }
        //   fd.append('images',this.form.selectedFile );
          services
            .uploadImages(fd)
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
