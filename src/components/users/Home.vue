<template>
     <div class="content-wrapper">

  <!-- Main content -->
  <section class="content" style="min-height:85vh">
    <!-- Small boxes (Stat box) -->
    <div class="container">
      <div class="row">
        <div class="page-header">
            <h1>Turtle Facts Quiz</h1>
            <h3>
                Learn about all the turtles below before you decide to take on the 
                <strong>TURTLE QUIZ</strong>
            </h3>
        </div>
        
      </div>
      <div class="row well well-sm ">
        <form class="navbar-form navbar-left" role="search">
            <div class="form-group">
              <input type="text" class="form-control" id="navbar-search-input" placeholder="Search" v-model="search" >
            </div>
          </form>
      </div>


        <div class=" text-center"  v-if="!data.length">

            <i class="fa fa-spinner fa-spin" style="font-size:24px"></i> Proccessing...please wait.
      </div>

     <div class="row">
        <div class="col-sm-6"  v-for="(turtle, index) in filteredSearch">
          <div class="well well-sm">
                   <div class="row">
                        <div class="col-md-6">
                          <img  v-bind:src="'http://localhost:8000/storage/images/' + turtle.image" class="img-rounded img-responsive well-image">
                        </div>
                        <div class="col-md-6">
                            
                                <h4>{{turtle.type}}</h4>
                                
                                <p><strong>Locations: </strong>{{turtle.locations}}</p>
                                <p><strong>Size: </strong>{{turtle.size}}</p>
                                <p><strong>Average Lifespan: </strong>{{turtle.lifespan}}</p>
                                <p><strong>Diet: </strong>{{turtle.diet}}</p>
                           
                                <button class="btn btn-primary pull-right" data-toggle="modal"
                                    data-target="#turtle-info"  v-on:click="changeActiveTurtle(turtle)" >Learn More</button>
                        </div>
                   </div>
          </div>
        </div>
     </div>




    </div>
   


  </section>
  <!-- /.content -->
  <div id="turtle-info" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false" >
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title text-center">{{activeTurtle.type}}</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-xs-8 col-xs-offset-2">
            
             
               <img  v-bind:src="'http://localhost:8000/storage/images/' + activeTurtle.image" class="img-rounded img-responsive" style="width:100%">
          </div>
      </div>
       <div class="row top-buffer">
          <div class="col-md-6">
            
              <p><strong>Locations: </strong>{{activeTurtle.locations}}</p>
              <p><strong>Size: </strong>{{activeTurtle.size}}</p>
              <p><strong>Average Lifespan: </strong>{{activeTurtle.lifespan}}</p>
              <p><strong>Diet: </strong>{{activeTurtle.diet}}</p>
          </div>
          <div class="col-xs-12 top-buffer">
            
              <p>{{activeTurtle.description}}</p>
              
          </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>

</div>
</template>

<script>
import services from "../../services";

export default {
  data() {
    return {
      data: [],
      activeTurtle:{},
      search:'',
    };
  },
  created(){

    if (!services.studyMaterialCached) {
      
      services.studyMaterials()
      .then(response => {
           this.handleSuccess(response);
          // console.log(response);
          })
       .catch(error => {
          //  this.handleError(error);
          console.log(error);
         });
    }else{
      try {
        this.data= services.getStudyMaterials();
        
      } catch (error) {
        services.studyMaterials()
      .then(response => {
           this.handleSuccess(response);
          // console.log(response);
          })
       .catch(error => {
          //  this.handleError(error);
          console.log(error);
         });
      }
    }
  },
  methods:{
    handleSuccess(response) {
      
      this.data= response.body.data;

      services.setStudyMaterials(this.data);
      services.studyMaterialCached=true;
     
    
    },
    
    changeActiveTurtle(turtle){
     this.activeTurtle=turtle;
    //  console.log(this.activeTurtle);
    }

  },
  computed:{

    filteredSearch:function(){
      return this.data.filter((dat)=>{
        return dat.type.toLowerCase().match(this.search.toLowerCase()) ;
       
      });
    },
  }
  
  
  
};
</script>

<style scoped >
  .well-image{
    width: 100%;
    height: 162px;
  }
  .top-buffer{
    margin-top: 20px;
  }
</style>
